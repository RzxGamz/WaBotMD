const bs = require('@bochilteam/scraper')

module.exports = {
  name: 'google',
  alias: ['googleit','googlesearch'],
  category: 'search',
  desc: 'Pencarian google',
  use: '<query>',
  async exec(msg, sock, args) {
    if (!args.join(' ')) return msg.reply('Masukkan query!')
    try {
    const res = bs.googleIt(args.join(' '))
    msg.replyAd(String(res.articles), 'Google Search', 'Google search on WhatsApp')
    } catch (e) {
      msg.reply(e.message)
    }
  }
}
