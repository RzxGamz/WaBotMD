const textpro = require('../../lib/scrape/textpro')

module.exports = {
   name: 'circuit',
   category: 'textpro',
   desc: 'Membuat teks ke image',
   use: '<text>',
   async exec(msg, sock, args) {
      if (!args.join(' ')) return msg.reply('Masukkan text!')
      const res = await textpro("https://textpro.me/create-blue-circuit-style-text-effect-online-1043.html", `${args.join(' ')}`)
      await sock.sendMessage(msg.from, { image: { url: res }, caption: "*TEXT PRO - BLUE CIRCUIT STYLE*" }, { quoted: msg })
   }
}
