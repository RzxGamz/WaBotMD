// require module
const P = require("pino");
const { Boom } = require("@hapi/boom");
const fs = require("fs");
const djs = require("@discordjs/collection");
const { default: makeWASocket, DisconnectReason, AnyMessageContent, delay, fetchLatestBaileysVersion, generateWAMessageFromContent, useSingleFileAuthState } = require('@adiwajshing/baileys');
const { exec, spawn } = require("child_process");
const axios = require('axios');
const fetch = require('node-fetch');
const util = require('util');
const path = require("path").join;

// your session
const { state, saveState } = useSingleFileAuthState(path(__dirname, `../session/session-md.json`), P({ level: "silent" }));
djs.commands = new djs.Collection();
djs.prefix = "/";

djs.mess_owner = 'Maaf command ini khusus owner!';
djs.mess_admin = 'Maaf command ini khusus admin group!';
djs.mess_badmin = 'Jadikan bot admin untuk menggunakan command ini!';
djs.mess_group = 'Maaf command ini khusus di dalam group!';
djs.mess_private = 'Maaf command ini khusus di chat pribadi!';

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
	await readCommand()
	const { version, isLatest } = await fetchLatestBaileysVersion()
	console.log(`Baileys Version v${version.join('.')}, isLatest: ${isLatest}`)
    
    const sock = makeWASocket({
        logger: P({ level: 'silent' }),
        printQRInTerminal: true,
        auth: state,
        version
    })
    
    sock.ev.on('messages.upsert', async m => {
        // console.log(JSON.stringify(m, undefined, 2));
        require('./sockchats')(sock, m)
    })
    
    sock.ev.on('messages.update', m => console.log(m))
    sock.ev.on('presence.update', m => console.log(m))
    sock.ev.on('chats.update', m => console.log(m))
    sock.ev.on('contacts.update', m => console.log(m))

    sock.ev.on('connection.update', (update) => {
        const { connection, lastDisconnect } = update
        if (connection) { console.log("Connection Status: ", connection); }

        if (connection === "close") {
            let reason = new Boom(lastDisconnect?.error)?.output?.statusCode;
            if (reason === DisconnectReason.badSession) { console.log(`Bad Session File, Please Delete './session-md.json' and Scan Again`); sock.logout(); }
            else if (reason === DisconnectReason.connectionClosed) { console.log("Connection closed, reconnecting...."); startSock(); }
            else if (reason === DisconnectReason.connectionLost) { console.log("Connection Lost from Server, reconnecting..."); startSock(); }
            else if (reason === DisconnectReason.connectionReplaced) { console.log("Connection Replaced, Another New Session Opened, Please Close Current Session First"); sock.logout(); }
            else if (reason === DisconnectReason.loggedOut) { console.log(`Device Logged Out, Please Delete './session-md.json' and Scan Again.`); sock.logout(); }
            else if (reason === DisconnectReason.restartRequired) { console.log("Restart Required, Restarting..."); startSock(); }
            else if (reason === DisconnectReason.timedOut) { console.log("Connection TimedOut, Reconnecting..."); startSock(); }
            else { sock.end(`Unknown DisconnectReason: ${reason}|${lastDisconnect.error}`) }
        }
        console.log('connection update', update)
    })
    
    // listen for when the auth credentials is updated
    sock.ev.on('creds.update', saveState)

    // custom function
    sock.sendMessageFromContent = async (mess, obj, opt = {}) => {
       let prepare = await generateWAMessageFromContent(typeof mess == 'object'?mess.key.remoteJid: mess, obj, opt)
       await sock.relayMessage(prepare.key.remoteJid, prepare.message, {
          messageId: prepare.key.id
       })
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
