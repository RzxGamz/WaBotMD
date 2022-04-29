const { kbbi } = require('@bochilteam/scraper')

module.exports = {
  name: 'kbbi',
  category: 'information',
  desc: 'Mencari informasi kamus besar bahasa indonesia',
  use: '<query>',
  async exec(msg, sock, args) {
    try {
      if (!args.join(' ')) return msg.reply('Masukkan query!')
      const res = await kbbi(args.join(' '))
      await msg.replyAd(JSON.stringify(res, null, 2), 'KBBI', 'Looking for information on kamus besar bahasa indonesia')
    } catch (e) {
      msg.reply(String(e))
    }
  }
}
