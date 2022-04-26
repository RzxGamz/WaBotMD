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
    let txt = ''
    for (let g of res.articles) {
      txt += `Header : ${g.header}\n`
      txt += `Title : ${g.title}\n`
      txt += `Link : ${g.url}\n`
      txt += `Desc : ${g.description}\n\n`
    }
    msg.replyAd(txt, 'Google Search', 'Google search on WhatsApp')
    } catch (e) {
      msg.reply(e.message)
    }
  }
}
