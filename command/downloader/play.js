const bs = require('@bochilteam/scraper')

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
         await sock.sendMessage(msg.from, { text: `*YouTube Play*\n\nTitle: ${res.video[0].title}\nChannel: ${res.video[0].authorName}\nDuration: ${res.video[0].durationH}\nView: ${res.video[0].viewH}\nUpload: ${res.video[0].publishedTime}\nUrl: ${res.video[0].url}\nDescription: ${res.video[0].description}\n\n_Silahkan pilih button di bawah untuk download_`, imageMessage: { url: res.video[0].thumbnail }, footer: "Rzx Bot", templateButtons: [{ urlButton: { displayText: 'YouTube', url: `${res.video[0].url}` }},{ quickReplyButton: { displayText: 'Video', id: `.ytmp4 ${res.video[0].url}` }},{ quickReplyButton: { displayText: 'Audio', id: `.ytmp3 ${res.video[0].url}` }}] }, { quoted: msg })
      } catch (e) {
       console.log(e)
    }
  }
}
