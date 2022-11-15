const { ytIdRegex, ytv } = require("../../lib/scrape/y2mate")
const ca = require('caliph-api')

module.exports = {
   name: 'ytmp4',
   alias: ['ytv','ytvideo'],
   category: 'downloader',
   desc: 'Download video youtube',
   use: '<link youtube>',
   async exec(msg, sock, args) {
      if (!ytIdRegex.test(args[0])) return msg.reply("Pastikan link yang kamu input adalah link youtube!")
      try {
        await msg.reply('*Loading . . .*')
        /*const resol = args[1] ? args[1] : "360p"
        const res = await ytv(args[0], resol)
        const { dl_link, thumb, title, filesizeF, filesize } = res
        sock.sendFileFromUrl(msg.from, thumb, `YOUTUBE VIDEO\n\n${String.fromCharCode(8206).repeat(4001)}${JSON.stringify(res, null, 2)}`, msg)
        sock.sendMessage(msg.from, { video: { url: dl_link } }, { quoted: msg })*/
        const res = await ca.downloader.yt.mp4(args[0])
        const capt = `*Youtube Mp4*\n\n• Title: ${res.result.title}\n• Channel: ${res.result.channel}\n• Quality: ${res.result.quality}\n• Duration: ${res.result.duration}\n• Upload: ${res.result.uploadDate}\n• Desc: ${res.result.desc}`
        sock.sendMessage(msg.from, { caption: capt, document: { url: res.result.result }, mimetype: 'video/mp4', fileName: res.result.title+'.mp4' }, { quoted: msg })
      } catch (e) { 
          msg.reply(e.message)
      }
   }
}
