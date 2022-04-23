const { ytIdRegex, ytv } = require("../../lib/scrape/y2mate")

module.exports = {
   name: 'ytmp4',
   alias: ['ytv','ytvideo'],
   category: 'downloader',
   desc: 'Download video youtube',
   use: '<link youtube>',
   async exec(msg, sock, args) {
      if (!ytIdRegex.test(args[0])) throw "Pastikan link yang kamu input adalah link youtube!"
      try {
        const resol = args[1] ? args[1] : "360p"
        const res = await ytv(args[0], resol)
        const { dl_link, thumb, title, filesizeF, filesize } = res
        sock.sendFileFromUrl(msg.from, thumb, `Youtube Video\n\n${title}\n${filesize}`)
        sock.sendMessage(msg.from, { video: { url: dl_link } })
      } catch (e) {
          msg.reply(e.message)
      }
   }
}
