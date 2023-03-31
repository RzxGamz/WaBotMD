const { serialize } = require("../function/helper.js")
const { exec, spawn } = require("child_process")
const axios = require('axios')
const fetch = require('node-fetch')
const util = require('util')
const moment = require("moment-timezone")
const fs = require("fs")
const path = require("path").join;
const djs = require("@discordjs/collection");

djs.mode = "self"

module.exports = async (sock, m) => {
	try {
	    if (m.type !== "notify") return
        let msg = serialize(JSON.parse(JSON.stringify(m.messages[0])), sock)
        if (!msg.message) return
        if (msg.key && msg.key.remoteJid === "status@broadcast") return
        if (msg.type === "protocolMessage" || msg.type === "senderKeyDistributionMessage" || !msg.type || msg.type === "") return
        
        // auto read & online
        //sock.sendReadReceipt(msg.from, msg.sender, [msg.key.id])
        //sock.sendPresenceUpdate('available', msg.from)

        const { body, isGroup, isPrivate, sender, from, pushName } = msg
        
        const time = moment(Date.now()).tz('Asia/Jakarta').locale('id').format('HH:mm:ss')
        const ucap = "Selamat "+moment(Date.now()).tz('Asia/Jakarta').locale('id').format('a')
        
        const mprefix = new RegExp('^[' + '!#$%&?/;:,.<>~-+='.replace(/[|\\{}()[\]^$+*?.\-\^]/g, '\\$&') + ']')
        const prefix = mprefix.test(body) ? body.split('').shift() : '/'
        djs.prefix = prefix
        const arg = body.substring(body.indexOf(' ') + 1)
        const args = body.trim().split(/ +/).slice(1)
        const isCmd = body.startsWith(prefix)
        const owner = ['6283894905341@s.whatsapp.net']
        const isOwner = owner.includes(sender)
        
        const cmdName = body.slice(prefix.length).trim().split(/ +/).shift().toLowerCase()
        const cmd = djs.commands.get(cmdName) || djs.commands.find((cmd) => cmd.alias && cmd.alias.includes(cmdName))
        
        // eval and exec command
        if (msg.key.fromMe && sender === "6283894905341@s.whatsapp.net") {
            if (body.startsWith('> ')) {
            	try {
                    let evaled = await eval(body.slice(2))
                    if (typeof evaled !== 'string') evaled = require('util').inspect(evaled)
                    msg.reply(evaled)
                } catch (err) {
                   msg.reply(String(err))
                }
        } else if (body.startsWith('=> ')) {
               function Return(sul) {
                    sat = JSON.stringify(sul, null, 2)
                    bang = util.format(sat)
                    if (sat == undefined) {
                        bang = util.format(sul)
                           }
                        return msg.reply(bang)
                    }
               try {
                    msg.reply(util.format(eval(`(async () => { return ${body.slice(3)} })()`)))
                 } catch (e) {
                    msg.reply(String(e))
               }
        } else if (body.startsWith("$ ")) {
                exec(body.slice(2), (err, stdout) => {
					if (err) return msg.reply(err)
					if (stdout) msg.reply(stdout)
			    })
            }
        }

        if (djs.mode === "self") {
            if (!isOwner && !isPrivate && !from.includes("6283866410126-1632228155@g.us")) return
        }
  
        if (isCmd) {
            console.log("[Recevied Message]\n• Time : ", time, "\n• Cmd : ", body, "\n• From : ", sender)
        }
        
        if (!cmd) return
        
        try {
            cmd.exec(msg, sock, args, arg);
          } catch (e) {
                console.error("[CMD ERROR] ", e);
             }
        } catch (e) {
        	console.log("[CHATS ERROR] ", String(e))
     }
}
