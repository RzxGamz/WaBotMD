module.exports = {
   name: 'hidetag',
   alias: ['tag','ht'],
   category: 'other',
   desc: 'Mention all member with text',
   use: '<text>',
   async exec(msg, sock, args) {
      if (!msg.key.fromMe) return msg.reply('Khusus owner!')

      const content = JSON.stringify(msg.message)
      const isQuoted = msg.type === 'extendedTextMessage'
      const isQuotedImage = msg.type === 'extendedTextMessage' && content.includes('imageMessage')
      const isQuotedVideo = msg.type === 'extendedTextMessage' && content.includes('videoMessage')
      const isQuotedAudio = msg.type === 'extendedTextMessage' && content.includes('audioMessage')
      const isQuotedSticker = msg.type === 'extendedTextMessage' && content.includes('stickerMessage')
      const stc = { key: { fromMe: false, participant: '0@s.whatsapp.net', ...({ }) }, message: { stickerMessage: { url: 'https://mmg.whatsapp.net/d/f/AqiHoGZkZmZbKQhl7CriCEyl3Jx4dEea3YXVeJB1g1nV.enc', fileSha256: 'dOPqGDlGQXE+J1M6MF+5gocA3OwrrpjCxoKhkzBmqh0=', fileEncSha256: 'ToatkJ5x42nXeUGudjfuTs84YdYRXNHWt1qn8ElmjwA=', mediaKey: 'pprn8qY3XA59lzVSJq0r/ZMsj9n20+0D36UgzIlbGXI=', mimetype: 'image/webp', height: 64, width: 64, directPath: '/v/t62.15575-24/23873765_981639602543391_503026363742106672_n.enc?ccb=11-4&oh=01_AVxBl2IhMn9DpnHbS7mWlky4IDJoMr-Dl85F_K1cpAJOWw&oe=62BAA2F5', fileLength: '19966', mediaKeyTimestamp: '1653954698', isAnimated: false } }}

      const groupMembers = sock.groupMetadata(msg.from).participants
      allmem = []
      for (let anu of groupMembers) {
         allmem.push(anu.id)
      }
      
      if (isQuoted) {
         sock.sendMessage(msg.from, { text: msg.message.extendedTextMessage.contextInfo.quotedMessage.conversation, mentions: allmem }, { quoted: stc })
      } else if (isQuotedImage) {
         sock.sendMessage(msg.from, { image: await msg.quoted.download(), caption: msg.message.extendedTextMessage.contextInfo.quotedMessage.imageMessage.caption, mentions: allmem }, { quoted: stc })
      } else if (isQuotedVideo) {
         sock.sendMessage(msg.from, { video: await msg.quoted.download(), caption: msg.message.extendedTextMessage.contextInfo.quotedMessage.videoMessage.caption, mentions: allmem }, { quoted: stc })
      } else if (isQuotedAudio) {
         sock.sendMessage(msg.from, { audio: await msg.quoted.download(), mimetype: 'audio', mentions: allmem }, { quoted: stc })
      } else {
         sock.sendMessage(msg.from, { text: args.join(' '), mentions: allmem }, { quoted: stc })
      }
   }
}
