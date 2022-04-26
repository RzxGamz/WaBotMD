const bs = require('@bochilteam/scraper')

module.exports = {
  name: 'pinterest',
  alias: ['pin'],
  category: 'search',
  desc: 'Mencari gambar di pinterest',
  use: '<query>',
  async exec(msg, sock, args) {
    if (!args.join(' ')) return msg.reply('Masukkan query!')
    try {
      const res = await bs.pinterest(args.join(' '))
      const result = res[Math.floor(Math.random() * res.length)]
      sock.sendMessage(msg.from, { image: { url: result }, caption: result }, { quoted: msg })
    } catch (e) {
      msg.reply(e.message)
    }
  }
}
