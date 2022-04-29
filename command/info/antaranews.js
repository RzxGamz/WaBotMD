const { antaranews } = require('@bochilteam/scraper')

module.exports = {
  name: 'antaranews',
  category: 'information',
  desc: 'Mencari informasi di website antaranews',
  async exec(msg, sock, args) {
    try {
      const res = await antaranews()
      await msg.replyAd(JSON.stringify(res, null, 2), 'Antaranews', 'Looking for information on website antaranews')
    } catch (e) {
      msg.reply(String(e))
    }
  }
}
