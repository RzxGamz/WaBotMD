const baileys = require('@adiwajshing/baileys')
const bs = require('@bochilteam/scraper')
const { getBuffer } = require('../../lib/function/func.js')

module.exports = {
   name: 'play',
   alias: ['ytplay','youtubeplay'],
   category: 'downloader',
   desc: 'Play Audio/Video youtube',
   use: '<judul video>',
   async exec(msg, sock, args) {
      if (!args.join(' ')) return msg.reply('Masukkan judul video yang ingin kamu download!')
      try {
         const res = await bs.youtubeSearch(args.join(' '))
         const buff = await getBuffer(res.video[0].thumbnail)
         const template = baileys.generateWAMessageFromContent(msg.from, baileys.proto.Message.fromObject({ templateMessage: { hydratedTemplate: { hydratedContentText: `*YouTube Play*\n\nTitle: ${res.video[0].title}\nChannel: ${res.video[0].authorName}\nDuration: ${res.video[0].durationH}\nView: ${res.video[0].viewH}\nUpload: ${res.video[0].publishedTime}\nUrl: ${res.video[0].url}\nDescription: ${res.video[0].description}\n\n_Silahkan pilih button di bawah untuk download_`, locationMessage: { jpegThumbnail: buff }, hydratedFooterText: "Rzx Bot", hydratedButtons: [{ urlButton: { displayText: 'YouTube', url: `${res.all[0].url}` }},{ quickReplyButton: { displayText: 'Video', id: `.ytmp4 ${res.all[0].url}` }},{ quickReplyButton: { displayText: 'Audio', id: `.ytmp3 ${res.all[0].url}` }}] } } }), { userJid: msg.sender, quoted: msg })
         sock.relayMessage(msg.from, template.message, { messageId: template.key.id } )
      } catch (e) {
       console.log(e)
    }
  }
}
