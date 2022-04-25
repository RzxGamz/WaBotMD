const bs = require("@bochilteam/scraper")

module.exports = {
   name: 'googleimage',
   alias: ['gimage','gimg'],
   category: 'search',
   desc: 'Mencari gambar di google',
   use: '<query>',
   async exec(msg, sock, args) {
    if (!args.join(" ")) return msg.reply("Masukkan query!")
      try {
         const res = await bs.googleImage(args.join(" "))
         const result = res[Math.floor(Math.random() * res.length)]
         sock.sendMessage(msg.from, { image: { url: result }, caption: result }, { quoted: msg })
         } catch (e) {
           msg.reply(e.message)
      }
   }
}
