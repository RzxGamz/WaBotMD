const { happymod } = require('tod-api')

module.exports = {
  name: 'happymod',
  category: 'search',
  desc: 'Mencari apk di website happymod',
  use: '<query>',
  async exec(msg, sock, args) {
    try {
      if (!args.join(' ')) return msg.reply('Masukkan query!')
      const res = await happymod(args.join(' '))
      res.author = ''
      await msg.replyAd(JSON.stringify(res, null, 2), 'Happymod Search', 'Happymod search on WhatsApp')
    } catch (e) {
      msg.reply(String(e))
    }
  }
}
