const textpro = require('../../lib/scrape/textpro')

module.exports = {
   name: 'layered',
   category: 'textpro',
   desc: 'Membuat teks ke image',
   use: '<text> | <text>',
   async exec(msg, sock, args, arg) {
      if (!args.join(' ')) return msg.reply('Masukkan text!')
      let txt1 = arg.split('|')[0] || "Your Text"
      let txt2 = arg.split('|')[1] || "Your Text"
      const res = await textpro("https://textpro.me/create-layered-text-effects-online-free-1032.html", [txt1, txt2])
      await sock.sendMessage(msg.from, { image: { url: res }, caption: "*TEXT PRO - LAYERED*" }, { quoted: msg })
   }
}
