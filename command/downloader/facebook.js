const hikki = require("hikki-me")

module.exports = {
   name: 'facebook',
   alias: ['facebookdl','fbdl','fb'],
   category: 'downloader',
   desc: 'Download media from facebook',
   use: '<link fb>',
   async exec(msg, sock, args) {
      try {
         if (!args.join(' ')) return msg.reply('Masukkan link facebook!')
         hikki.downloader.facebookDownload(args.join(' ')).then(res => {
            const { result } = res
            const { title, hd, sd, audio } = result
            if (args.join(' ').toLowerCase().endsWith("--hd")) {
               sock.sendFileFromUrl(msg.from, hd, title, msg)
            } else if (args.join(' ').toLowerCase().endsWith("--sd")) {
               sock.sendFileFromUrl(msg.from, sd, title, msg)
            } else if (args.join(' ').toLowerCase().endsWith("--audio")) {
               sock.sendMessage(msg.from, { audio: { url: audio }, mimetype: "audio/mp3" }, { quoted: msg })
            } else {
               sock.sendFileFromUrl(msg.from, hd, title, msg)
            }
         }).catch(console.error)
      } catch (e) {
         console.log(e)
      }
   }
}
