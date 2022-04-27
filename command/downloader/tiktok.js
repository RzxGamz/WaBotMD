const { tiktokdl, tiktokdlv2, tiktokdlv3 } = require('@bochilteam/scraper')

module.exports = {
  name: 'tiktok',
  alias: ['tiktokdl','ttdl'],
  category: 'downloader',
  desc: 'Download video tiktok',
  use: '<link tiktok>\n\nDownload video :\n/tiktok <link> --video\n\nDownload audio :\n/tiktok <link> --audio',
  async exec(msg, sock, args) {
    if (!/(?:https:?\/{2})?(?:w{3}|vm|vt|t)?\.?tiktok.com\/([^\s&]+)/gi.test(args[0])) return msg.reply('Masukkan link tiktok!')
    try {
      await msg.reply('*Loading . . .*')
      const opt = args[1]
      const res = await tiktokdlv3(args[0])
      const capt = JSON.stringify(res, null, 2)
      switch (opt) {
        case '--video':
          await sock.sendFileFromUrl(msg.from, res.video.no_watermark, capt, msg)
          break
        case '--audio':
          await sock.sendMessage(msg.from, { audio: { url: res.music }, mimetype: 'audio/mp4' }, { quoted: msg })
          break
        default:
          await sock.sendFileFromUrl(msg.from, res.video.no_watermark, capt, msg)
      }
    } catch (e) {
      msg.reply(e.message)
    }
  }
}
