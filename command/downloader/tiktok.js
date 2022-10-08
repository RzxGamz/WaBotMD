const ca = require('caliph-api')

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
          res = await ca.downloader.tiktok(args[0])
          capt = `*Tiktok Downloader*\n\n• Title : ${res.title}\n• Author : ${res.author}`
          await sock.sendMessage(msg.from, { caption: capt, document: { url: res.nowm }, mimetype: 'video/mp4', fileName: res.title+'.mp4' }, { quoted: msg })
          break
        case '--audio':
          let resm = await ca.downloader.tiktok(args[0])
          await sock.sendMessage(msg.from, { caption: resm.title, document: { url: resm.audio }, mimetype: 'audio/mp3', fileName: resm.title+'.mp3' }, { quoted: msg })
          break
        default:
          res = await ca.downloader.tiktok(args[0])
          capt = `*Tiktok Downloader*\n\n• Title : ${res.title}\n• Author : ${res.author}`
          await sock.sendMessage(msg.from, { caption: capt, document: { url: res.nowm }, mimetype: 'video/mp4', fileName: res.title+'.mp4' }, { quoted: msg })
      }
    } catch (e) {
      msg.reply(e.message)
    }
  }
}
