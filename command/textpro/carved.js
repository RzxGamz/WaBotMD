const textpro = require('../../lib/scrape/textpro')

module.exports = {
   name: 'carved',
   category: 'textpro',
   desc: 'Membuat teks ke image',
   use: '<text>',
   async exec(msg, sock, args) {
      if (!args[0]) return msg.reply('Masukkan text!')
      const res = await textpro("https://textpro.me/create-carved-stone-text-effect-online-1074.html", `${args[0]}`)
      await sock.sendMessage(msg.from, { image: { url: res }, caption: "*TEXT PRO - CARVED STONE*" }, { quoted: msg })
   }
}
