const { igdl } = require("hxz-api")

module.exports = {
  name: 'instagram',
  alias: ['ig','igdl','instadl','instagramdl'],
  category: 'downloader',
  desc: 'Download video or photo instagram',
  use: '<link instagram>',
  async exec(msg, sock, args) {
    if (!args[0]) return msg.reply('Masukkan link instagram!')
    try {
      await msg.reply('*Loading . . .*')
      const res = await igdl(args[0])
      const capt = JSON.stringify(res.user, null, 2)
      for (let i = 0; i < res.medias.length; i++) await sock.sendFileFromUrl(msg.from, res.medias[i].url, capt, msg)
    } catch (e) {
      msg.reply(String(e))
    }
  }
}
