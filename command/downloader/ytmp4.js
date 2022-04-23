const { ytIdRegex, ytv } = require("../../lib/scrape/y2mate")

module.exports = {
   name: 'ytmp4',
   alias: ['ytv','ytvideo'],
   category: 'downloader',
   desc: 'Download video youtube',
   use: '<link youtube>',
   async exec(msg, sock, args) {
      if (!ytIdRegex.test(msg.body)) throw "Pastikan link yang kamu input adalah link youtube!"
      try {
        const res = await ytv(args.join(" "))
        const { dl_link, thumb, title, filesizeF, filesize } = res
        sock.sendFileFromUrl(msg.from, thumb, `Youtube Video\n\n${title}\n${filesize}`)
        sock.sendMessage(msg.from, { video: { url: dl_link } })
      } catch (e) {
          msg.reply(e.message)
      }
   }
}