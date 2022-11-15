const { proto, getContentType, downloadContentFromMessage } = require("@adiwajshing/baileys");
const { getGroupAdmins } = require("./func.js")
const Bluebird = require("bluebird");
const fs = require('fs');

/**
 * parse message for easy use
 * @param {proto.IWebMessageInfo} msg 
 * @param {import("@adiwajshing/baileys/src").AnyWASocket} sock 
 */
function serialize(msg, sock) {
    if (msg.key) {
        msg.id = msg.key.id;
        msg.isSelf = msg.key.fromMe;
        msg.from = msg.key.remoteJid;
        msg.sender = msg.isSelf ? (sock.type === "legacy" ? sock.state.legacy.user.id : (sock.user.id.split(":")[0] + "@s.whatsapp.net" || sock.user.id))
            : ((msg.key.participant?.includes(":") ? msg.key.participant?.split(":")[0] + "@s.whatsapp.net" : msg.key.participant) || (msg.key.remoteJid?.includes(":") ? msg.key.remoteJid?.split(":")[0] + "@s.whatsapp.net" : msg.key.remoteJid));
        msg.isGroup = msg.from.endsWith("@g.us");
        msg.isPrivate = msg.from.endsWith("@s.whatsapp.net");
    }
    if (msg.message) {
        msg.type = getContentType(msg.message);
        if (msg.type === "ephemeralMessage") {
            msg.message = msg.message[msg.type].message;
            const tipe = Object.keys(msg.message)[0];
            msg.type = tipe;
            if (tipe === "viewOnceMessage") {
                msg.message = msg.message[msg.type].message;
                msg.type = getContentType(msg.message);
            }
        }
        if (msg.type === "viewOnceMessage") {
            msg.message = msg.message[msg.type].message;
            msg.type = getContentType(msg.message);
        }

        msg.mentions = msg.message[msg.type]?.contextInfo ? msg.message[msg.type]?.contextInfo.mentionedJid : [];
        try {
            const quoted = msg.message[msg.type]?.contextInfo;
            if (quoted.quotedMessage["ephemeralMessage"]) {
                const tipe = Object.keys(quoted.quotedMessage.ephemeralMessage.message)[0];
                if (tipe === "viewOnceMessage") {
                    msg.quoted = {
                        type: "view_once",
                        stanzaId: quoted.stanzaId, participant: quoted.participant.includes(":") ? quoted.participant.split(":")[0] + "@s.whatsapp.net" : quoted.participant,
                        message: quoted.quotedMessage.ephemeralMessage.message.viewOnceMessage.message
                    }
                } else {
                    msg.quoted = {
                        type: "ephemeral",
                        stanzaId: quoted.stanzaId, participant: quoted.participant.includes(":") ? quoted.participant.split(":")[0] + "@s.whatsapp.net" : quoted.participant,
                        message: quoted.quotedMessage.ephemeralMessage.message
                    }
                }
            } else if (quoted.quotedMessage["viewOnceMessage"]) {
                msg.quoted = {
                    type: "view_once",
                    stanzaId: quoted.stanzaId, participant: quoted.participant.includes(":") ? quoted.participant.split(":")[0] + "@s.whatsapp.net" : quoted.participant,
                    message: quoted.quotedMessage.viewOnceMessage.message
                }
            } else {
                msg.quoted = {
                    type: "normal",
                    stanzaId: quoted.stanzaId, participant: quoted.participant.includes(":") ? quoted.participant.split(":")[0] + "@s.whatsapp.net" : quoted.participant,
                    message: quoted.quotedMessage
                }
            }
            msg.quoted.isSelf = msg.quoted.participant === (sock.type === "legacy" ? sock.state.legacy.user.id : (sock.user.id && sock.user.id.split(":")[0] + "@s.whatsapp.net"));
            msg.quoted.mtype = Object.keys(msg.quoted.message).filter(v => v.includes("Message") || v.includes("conversation"))[0];
            msg.quoted.text =
                msg.quoted.message[msg.quoted.mtype]?.text || msg.quoted.message[msg.quoted.mtype]?.description
                || msg.quoted.message[msg.quoted.mtype]?.caption || msg.quoted.message[msg.quoted.mtype]?.hydratedTemplate?.hydratedContentText
                || msg.quoted.message[msg.quoted.mtype] || ""
            msg.quoted.key = { id: msg.quoted.stanzaId, fromMe: msg.quoted.isSelf, remoteJid: msg.from };
            msg.quoted.delete = () => sock.sendMessage(msg.from, { delete: msg.quoted.key });
            msg.quoted.download = (pathFile) => downloadMedia(msg.quoted.message, pathFile);
        } catch {
            msg.quoted = null;
        }
        msg.body = msg.message?.conversation || msg.message?.[msg.type]?.text || msg.message?.[msg.type]?.caption || (msg.type === "listResponseMessage") && msg.message?.[msg.type]?.singleSelectReply?.selectedRowId || (msg.type === "buttonsResponseMessage") && msg.message?.[msg.type]?.selectedButtonId || (msg.type === "templateButtonReplyMessage") && msg.message?.[msg.type]?.selectedId || '';
        msg.reply = (text) => sock.sendMessage(msg.from, { text }, { quoted: msg });
        msg.replyAd = (txt, title, body = '') => sock.sendMessage(msg.from, { text: txt, contextInfo: { externalAdReply: { title: title, body: body, previewType: "PHOTO", thumbnailUrl: 'https://img.freepik.com/free-vector/laptop-with-program-code-isometric-icon-software-development-programming-applications-dark-neon_39422-971.jpg?t=st=1650126483~exp=1650127083~hmac=4655d51ed454e422d55d87d9eab7ff1af10f5f2a02f575305305c2364f3598c8&w=740', sourceUrl: '', showAdAttribution: true }}}, { quoted: msg })
        msg.download = (pathFile) => downloadMedia(msg.message, pathFile);
    }
    return msg;
}

/**
 * downloadMediaMessage
 * @param {proto.IMessage} message 
 * @param {string} pathFile 
 * @returns 
 */
const downloadMedia = (message, pathFile) => new Bluebird(async (resolve, reject) => {
  const type = Object.keys(message)[0];
  let mimeMap = {
    "imageMessage": "image",
    "videoMessage": "video",
    "stickerMessage": "sticker",
    "documentMessage": "document",
    "audioMessage": "audio"
  }
  try {
    if (pathFile) {
      const stream = await downloadContentFromMessage(message[type], mimeMap[type]);
      let buffer = Buffer.from([]);
      for await (const chunk of stream) {
        buffer = Buffer.concat([buffer, chunk]);
      }
      await fs.promises.writeFile(pathFile, buffer);
      resolve(pathFile);
    } else {
      const stream = await downloadContentFromMessage(message[type], mimeMap[type]);
      let buffer = Buffer.from([]);
      for await (const chunk of stream) {
        buffer = Buffer.concat([buffer, chunk]);
      }
      resolve(buffer);
    }
  } catch (e) { reject(e) }
})

module.exports = { serialize };
