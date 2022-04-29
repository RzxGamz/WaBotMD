const { suaracom } = require('@bochilteam/scraper')

module.exports = {
  name: 'suaracom',
  category: 'information',
  desc: 'Mencari informasi di website suaracom',
  async exec(msg, sock, args) {
    try {
      const res = await suaracom()
      await msg.replyAd(JSON.stringify(res, null, 2), 'Suaracom', 'Looking for information on website suara.com')
    } catch (e) {
      msg.reply(String(e))
    }
  }
}
