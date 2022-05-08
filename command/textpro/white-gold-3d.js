const textpro = require('../../lib/scrape/textpro')

module.exports = {
   name: 'whitegold3d',
   category: 'textpro',
   desc: 'Membuat teks ke image',
   use: '<text>',
   async exec(msg, sock, args) {
      if (!args.join(' ')) return msg.reply('Masukkan text!')
      const res = await textpro("https://textpro.me/elegant-white-gold-3d-text-effect-online-free-1070.html", `${args.join(' ')}`)
      await sock.sendMessage(msg.from, { image: { url: res }, caption: "*TEXT PRO - WHITE GOLD 3D*" }, { quoted: msg })
   }
}
