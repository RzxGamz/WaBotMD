const { wikipedia } = require('@bochilteam/scraper')

module.exports = {
  name: 'wikipedia',
  alias: ['wiki','wp'],
  category: 'information',
  desc: 'Mencari informasi di wikipedia',
  use: '<query>',
  async exec(msg, sock, args) {
    try {
    const text = args.join(' ')
    if (!text) return msg.reply('Masukkan query!')
    const res = await wikipedia(text)
    await msg.replyAd(JSON.stringify(res, null, 2), 'Wikipedia', 'Looking for information on wikipedia')
    } catch (e) {
      msg.reply(String(e))
    }
  }
}
