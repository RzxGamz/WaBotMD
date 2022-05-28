const { rexdl } = require('../../lib/scrape/rexdl.js')

module.exports = {
   name: 'rexdl',
   alias: ['apk','apksearch','rexdlsearch'],
   category: 'search',
   desc: 'Search apk from rexdl.com',
   use: '<name apk>',
   async exec(msg, sock, args) {
     try {
       const query = args.join(' ')
       if (!query) return msg.reply('Masukkan nama aplikasi!')
       msg.reply('*Searching . . .*')
       const res = await rexdl(query)
       let txt = ""
       for (let rx of res) {
          txt += `Nama : ${rx.judul}\n`
          txt += `Category : ${rx.kategori}\n`
          txt += `Upload : ${rx.upload_date}\n`
          txt += `Desc : ${rx.deskripsi}\n`
          txt += `Thumb : ${rx.thumb}\n`
          txt += `Link : ${rx.link}\n\n`
       }
       msg.replyAd(txt, "Rexdl Search", "Search for apps on rexdl")
       } catch (e) {
        console.log(e)
      }
   }
}
