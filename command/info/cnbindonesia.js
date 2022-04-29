const { cnbindonesia } = require('@bochilteam/scraper')

module.exports = {
  name: 'cnbindonesia',
  alias: ['cnb','cnbindo'],
  category: 'information',
  desc: 'Mencari informasi di website cnbindonesia',
  async exec(msg, sock, args) {
    try {
      const res = await cnbindonesia()
      await msg.replyAd(JSON.stringify(res, null, 2), 'Cnb Indonesia', 'Looking for information on website cnbindonesia')
    } catch (e) {
      msg.reply(String(e))
    }
  }
}
