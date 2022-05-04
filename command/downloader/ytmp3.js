const { ytIdRegex, yta } = require("../../lib/scrape/y2mate")

module.exports = {
   name: 'ytmp3',
   alias: ['yta','ytaudio'],
   category: 'downloader',
   desc: 'Download audio youtube',
   use: '<link youtube> <resolusi>',
   async exec(msg, sock, args) {
      if (!ytIdRegex.test(args[0])) return msg.reply("Pastikan link yang kamu input adalah link youtube!")
     try {
        await msg.reply('*Loading . . .*')
        const resol = args[1] ? args[1] : "128kbps"
        const res = await yta(args[0], resol)
        const { dl_link, thumb, title, filesizeF, filesize } = res
        sock.sendFileFromUrl(msg.from, thumb, `*YOUTUBE AUDIO*\n\n${String.fromCharCode(8206).repeat(4001)}${JSON.stringify(res, null, 2)}`, msg)
        sock.sendMessage(
        msg.from, 
        { audio: { url: dl_link }, mimetype: 'audio/mp4', contextInfo: { externalAdReply: { title: title, body: 'Play audio youtube', thumbnailUrl: thumb, mediaType: 2, mediaUrl: args[0] }}}
        )
      } catch (e) {
          msg.reply(e.message)
      }
   }
}
