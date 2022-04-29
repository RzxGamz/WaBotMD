const { liputan6 } = require('@bochilteam/scraper')

module.exports = {
  name: 'liputan6',
  category: 'information',
  desc: 'Mencari informasi di website liputan6',
  async exec(msg, sock, args) {
    try {
      const res = await liputan6()
      await msg.replyAd(JSON.stringify(res, null, 2), 'Liputan6', 'Looking for information on website liputan6')
    } catch (e) {
      msg.reply(String(e))
    }
  }
}
