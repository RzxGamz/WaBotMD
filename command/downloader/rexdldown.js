const { rexdldown } = require('../../lib/scrape/rexdl.js')

module.exports = {
   name: 'rexdldown',
   alias: ['apkdl','rexdldownload'],
   category: 'downloader',
   desc: 'Download apps from link rexdl',
   use: '<link rexdl>',
   async exec(msg, sock) {
      try {
        const link = args.join(' ')
        if (!link) return msg.reply('Masukkan link rexdl!')
        const res = await rexdldown(link)
        let txt = `Name : ${res.judul}\nLatest update : ${res.update_date}\nVersion: ${res.version}\nSize : ${res.size}\nLink : ${res.download}`
        msg.replyAd(txt, "Rexdl Downloader", "Download the app on rexdl")
        await sock.sendMessage(msg.from, { document: { url: res.download }, mimetype: "application/octet-stream", fileName: res.judul+".apk" })
      } catch (e) {
        console.log(e)
      }
   }
}
