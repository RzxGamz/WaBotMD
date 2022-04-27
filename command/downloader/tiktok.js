const { tiktokdl, tiktokdlv2, tiktokdlv3 } = require('@bochilteam/scraper')

module.exports = {
  name: 'tiktok',
  alias: ['tiktokdl','ttdl'],
  category: 'downloader',
  desc: 'Download video tiktok',
  use: '<link tiktok>\n\nDownload video :\n/tiktok <link> --video\n\nDownload audio :\n/tiktok <link> --audio',
  async exec(msg, sock, args) {
    const ttRegex = /(?:https:?\/{2})?(?:w{3}|vm|vt|t)?\.?tiktok.com\/([^\s&]+)/
    if (!ttRegex.test(args[0])) return msg.reply('Masukkan link tiktok!')
    try {
      await msg.reply('*Loading . . .*')
      const opt = args[1]
      let res
      let capt
      switch (opt) {
        case '--video':
          res = await tiktokdlv3(args[0])
          capt = JSON.stringify(res, null, 2)
          await sock.sendFileFromUrl(msg.from, res.video.no_watermark, capt, msg)
          break
        case '--audio':
          res = await tiktokdlv3(args[0])
          await sock.sendMessage(msg.from, { audio: { url: res.music }, mimetype: 'audio/mp4' }, { quoted: msg })
          break
        default:
          res = await tiktokdlv3(args[0])
          capt = JSON.stringify(res, null, 2)
          await sock.sendFileFromUrl(msg.from, res.video.no_watermark, capt, msg)
      }
    } catch (e) {
      msg.reply(e.message)
    }
  }
}
