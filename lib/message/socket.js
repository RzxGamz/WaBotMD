// require module
const P = require("pino");
const { Boom } = require("@hapi/boom");
const fs = require("fs");
const djs = require("@discordjs/collection");
const { default: makeWASocket, makeInMemoryStore, DisconnectReason, AnyMessageContent, delay, fetchLatestBaileysVersion, generateWAMessageFromContent, useMultiFileAuthState, makeCacheableSignalKeyStore } = require('@adiwajshing/baileys');
const { exec, spawn } = require("child_process");
const axios = require('axios');
const fetch = require('node-fetch');
const util = require('util');
const path = require("path").join;
const NodeCache = require("node-cache");

const useStore = !process.argv.includes('--no-store')
const doReplies = !process.argv.includes('--no-reply')

// external map to store retry counts of messages when decryption/encryption fails
// keep this out of the socket itself, so as to prevent a message decryption/encryption loop across socket restarts
const msgRetryCounterCache = new NodeCache()

// the store maintains the data of the WA connection in memory
// can be written out to a file & read from it
const store = useStore ? makeInMemoryStore({ logger: P().child({ level: 'silent', stream: 'store' }) }) : undefined
// can be read from a file
store.readFromFile('../session/baileys_store.json')
// saves the state to a file every 10s
setInterval(() => {
    store.writeToFile('../session/baileys_store.json')
}, 10_000)

djs.commands = new djs.Collection();

// read command file
const readCommand = () => {
    let rootDir = path(__dirname, "../../command");
    let dir = fs.readdirSync(rootDir);
    dir.forEach(async (res) => {
        const commandFiles = fs.readdirSync(`${rootDir}/${res}`).filter((file) => file.endsWith('.js'));
        for (const file of commandFiles) {
            const command = require(`${rootDir}/${res}/${file}`);
            djs.commands.set(command.name, command);
        }
    });
    console.log('Command loaded!');
}

// start a connection
async function startSock () {
    const { state, saveCreds } = await useMultiFileAuthState("../session/session-md.json")
	await readCommand()
	const { version, isLatest } = await fetchLatestBaileysVersion()
	console.log(`Baileys Version v${version.join('.')}, isLatest: ${isLatest}`)
    
    const sock = makeWASocket({
        logger: P({ level: 'silent' }),
        printQRInTerminal: true,
        auth: {
			creds: state.creds,
			/** caching makes the store faster to send/recv messages */
			keys: makeCacheableSignalKeyStore(state.keys, P({ level: 'silent' })),
		},
        msgRetryCounterCache,
        version,
        browser: ["Rzx Bot", "Safari", "3.0"],
	    getMessage: async key => {
            if(store) {
                const msg = await store.loadMessage(key.remoteJid, key.id, undefined)
                return msg?.message || undefined
                }
                return {
                conversation: 'hallo'
            }
        },
        patchMessageBeforeSending: (message) => {
            {
                const requiresPatch = !!(
                message.buttonsMessage ||
                message.listMessage || 
                message.templateMessage
                );
                if (requiresPatch) {
                message = {
                viewOnceMessage: {
                message: {
                messageContextInfo: {   
                deviceListMetadataVersion: 2,  
                deviceListMetadata: {},
                },
                ...message,
                },
                },
                };
                }
                return message
            }
        }
    })
    
    // will listen from this socket
    // the store can listen from a new socket once the current socket outlives its lifetime
    store.bind(sock.ev)

    sock.ev.on('chats.set', () => {
        // can use "store.chats" however you want, even after the socket dies out
        // "chats" => a KeyedDB instance
        console.log('got chats', store.chats.all())
    })

    sock.ev.on('contacts.set', () => {
        console.log('got contacts', Object.values(store.contacts))
    })
    
    sock.ev.on('messages.upsert', async m => {
        // console.log(JSON.stringify(m, undefined, 2));
        require('./sockchats')(sock, m)
    })
    
    /*
    sock.ev.on('messages.update', m => console.log(m))
    sock.ev.on('presence.update', m => console.log(m))
    sock.ev.on('chats.update', m => console.log(m))
    sock.ev.on('contacts.update', m => console.log(m))
    */

    sock.ev.on('connection.update', (update) => {
        const { connection, lastDisconnect } = update
        if (connection === 'close') {
            lastDisconnect.error?.output?.statusCode !== DisconnectReason.loggedOut ? startSock() : console.log('Koneksi Terputus...')
        }
        console.log('connection update', update)
    })
    
    // listen for when the auth credentials is updated
    sock.ev.on('creds.update', saveCreds)

    // custom function
    /*sock.sendMessageFromContent = async (mess, obj, opt = {}) => {
       let prepare = await generateWAMessageFromContent(typeof mess == 'object'?mess.key.remoteJid: mess, obj, opt)
       await sock.relayMessage(prepare.key.remoteJid, prepare.message, {
          messageId: prepare.key.id
       })
    return prepare
    }*/

    sock.sendMessageFromContent = async (jid, message, options = {}) => {
		var option = { contextInfo: {}, ...options }
		var prepare = await generateWAMessageFromContent(jid, message, option)
		await sock.relayMessage(jid, prepare.message, { messageId: prepare.key.id })
		return prepare
	 }
    
    sock.sendFileFromUrl = async (from, url, caption, msg, men) => {
      let mime = '';
      let res = await axios.head(url)
      mime = res.headers['content-type']
      if (mime.split("/")[1] === "gif") {
           return sock.sendMessage(from, { video: { url: url }, caption: caption, gifPlayback: true, mentions: men ? men : []}, {quoted: msg })
      }
       let type = mime.split("/")[0]+"Message"
       if(mime === "application/pdf"){
           return sock.sendMessage(from, { document: { url: url }, mimetype: 'application/pdf', caption: caption, mentions: men ? men : []}, {quoted: msg })
       }
       if(mime.split("/")[0] === "image"){
           return sock.sendMessage(from, { image: { url: url }, caption: caption, mentions: men ? men : []}, {quoted: msg})
       }
       if(mime.split("/")[0] === "video"){
            return sock.sendMessage(from, { video: { url: url }, caption: caption, mentions: men ? men : []}, {quoted: msg})
        }
        if(mime.split("/")[0] === "audio"){
            return sock.sendMessage(from, { audio: { url: url }, caption: caption, mentions: men ? men : [], mimetype: 'audio'}, {quoted: msg })
        }
    }

    return sock
}

startSock()
