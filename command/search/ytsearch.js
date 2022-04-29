const yts = require('yt-search')

module.exports = {
  name: 'ytsearch',
  alias: ['yts','youtubesearch'],
  category: 'search',
  desc: 'Pencarian youtube',
  use: '<query>',
  async exec(msg, sock, args) {
    const query = args.join(' ')
    try {
      if (!query) return msg.reply('Masukkan query!')
      const res = await yts(query)
      await msg.replyAd(JSON.stringify(res, null, 2), 'Youtube Search', 'Youtube search on WhatsApp')
    } catch (e) {
      msg.reply(String(e))
    }
  }
}
