const { merdeka } = require('@bochilteam/scraper')

module.exports = {
  name: 'merdeka',
  category: 'information',
  desc: 'Mencari informasi di website merdeka',
  async exec(msg, sock, args) {
    try {
      const res = await merdeka()
      await msg.replyAd(JSON.stringify(res, null, 2), 'Merdeka', 'Looking for information on website merdeka')
    } catch (e) {
      msg.reply(String(e))
    }
  }
}
