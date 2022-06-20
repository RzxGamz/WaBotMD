const baileys = require('@adiwajshing/baileys')
const yts = require('yt-search')

module.exports = {
   name: 'play',
   alias: ['ytplay','youtubeplay'],
   category: 'downloader',
   desc: 'Play Audio/Video youtube',
   use: '<judul video>',
   async exec(msg, sock, args) {
      if (!args.join(' ')) return msg.reply('Masukkan judul video yang ingin kamu download!')
      try {
         const res = await yts(args.join(' '))
         const buff = await reSize(res.all[0].image, 200, 200)
         const template = baileys.generateWAMessageFromContent(msg.from, baileys.proto.Message.fromObject({ templateMessage: { hydratedTemplate: { hydratedContentText: `*YouTube Play*\n\nTitle: ${res.all[0].title}\nDuration: ${res.all[0].timestamp}\nUpload: ${res.all[0].ago}\nUrl: ${res.all[0].url}\nDescription: ${res.all[0].description}\n\n_Silahkan pilih button di bawah untuk download_`, locationMessage: { jpegThumbnail: buff }, hydratedFooterText: "Rzx Bot", hydratedButtons: [{ urlButton: { displayText: 'YouTube', url: `${res.all[0].url}` }},{ quickReplyButton: { displayText: 'Video', id: `.ytmp4 ${res.all[0].url}` }},{ quickReplyButton: { displayText: 'Audio', id: `.ytmp3 ${res.all[0].url}` }}] } } }), { userJid: msg.sender, quoted: msg })
         sock.relayMessage(msg.from, template.message, { messageId: template.key.id } )
      } catch (e) {
       console.log(e)
    }
  }
}
