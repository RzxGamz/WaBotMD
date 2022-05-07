const textpro = require('../../lib/scrape/textpro')

module.exports = {
   name: 'pornhub',
   alias: ['ph','phub'],
   category: 'textpro',
   desc: 'Membuat teks ke image',
   use: '<text> <text>',
   async exec(msg, sock, args) {
      if (!args[1]) return msg.reply('Masukkan 2 text!')
      const res = await textpro("https://textpro.me/pornhub-style-logo-online-generator-free-977.html", [`${args[0]}`,`${args[1]}`])
      await sock.sendMessage(msg.from, { image: { url: res }, caption: "*TEXT PRO - PORNHUB*" }, { quoted: msg })
   }
}
