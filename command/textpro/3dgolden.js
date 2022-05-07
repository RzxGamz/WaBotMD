const textpro = require('../../lib/scrape/textpro')

module.exports = {
   name: '3dgolden',
   category: 'textpro',
   desc: 'Membuat teks ke image',
   use: '<text>',
   async exec(msg, sock, args) {
      if (!args.join(' ')) return msg.reply('Masukkan text!')
      const res = await textpro("https://textpro.me/free-creative-3d-golden-text-effect-online-1075.html", `${args.join(' ')}`)
      await sock.sendMessage(msg.from, { image: { url: res }, caption: "*TEXT PRO - 3D GOLDEN*" }, { quoted: msg })
   }
}
