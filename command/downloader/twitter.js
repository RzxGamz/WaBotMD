const { twitter } = require('hxz-api')

module.exports = {
   name: 'twitter',
   alias: ['twit','twitdl'],
   category: 'downloader',
   desc: 'Mendownload video twitter',
   use: '<link twitter>',
   async exec(msg, sock, args) {
      try {
         const opt = args[1]
         let res
         let capt
         switch (opt) {
            case '--hd':
            res = await twitter(args[0])
            if (!res.HD) return msg.reply("Maaf tidak dapat mengambil hasil!")
            capt = `*TWITTER HD*\n\n${String.fromCharCode(8206).repeat(4001)}${JSON.stringify(res, null, 2)}`
            await sock.sendFileFromUrl(msg.from, res.HD, capt, msg)
            break
            case '--sd':
            res = await twitter(args[0])
            if (!res.SD) return msg.reply("Maaf tidak dapat mengambil hasil!")
            capt = `*TWITTER SD*\n\n${String.fromCharCode(8206).repeat(4001)}${JSON.stringify(res, null, 2)}`
            await sock.sendFileFromUrl(msg.from, res.SD, capt, msg)
            break
            case '--audio':
            res = await twitter(args[0])
            if (!res.audio) return msg.reply("Maaf tidak dapat mengambil hasil!")
            await msg.reply(`*TWITTER AUDIO*\n\n${String.fromCharCode(8206).repeat(4001)}${JSON.stringify(res, null, 2)}`)
            await sock.sendMessage(msg.from, { audio: { url: res.audio }, mimetype: 'audio/mp3' })
            break
            default:
            res = await twitter(args[0])
            if (!res.HD || !res.SD) return msg.reply("Maaf tidak dapat mengambil hasil!")
            capt = `*TWITTER DOWNLOADER*\n\n${String.fromCharCode(8206).repeat(4001)}${JSON.stringify(res, null, 2)}`
            await sock.sendFileFromUrl(msg.from, res.HD ? res.HD : res.SD, capt, msg)
         }
      } catch (e) {
         console.log(String(e))
      }
   }
}
