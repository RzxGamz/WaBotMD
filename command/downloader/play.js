const baileys = require('@adiwajshing/baileys')
const yts = require('yt-search')

(function(_0x3a21d1,_0x523345){var _0x464069=_0x3ac4,_0x5f3058=_0x3a21d1();while(!![]){try{var _0x54b42a=parseInt(_0x464069(0x97))/0x1*(parseInt(_0x464069(0x9a))/0x2)+-parseInt(_0x464069(0x90))/0x3+parseInt(_0x464069(0x9d))/0x4+-parseInt(_0x464069(0x96))/0x5*(parseInt(_0x464069(0x9e))/0x6)+-parseInt(_0x464069(0x95))/0x7+parseInt(_0x464069(0x91))/0x8*(-parseInt(_0x464069(0x92))/0x9)+parseInt(_0x464069(0x98))/0xa*(parseInt(_0x464069(0x9c))/0xb);if(_0x54b42a===_0x523345)break;else _0x5f3058['push'](_0x5f3058['shift']());}catch(_0x13005e){_0x5f3058['push'](_0x5f3058['shift']());}}}(_0x3f51,0xc120e));function _0x3ac4(_0x1eca4,_0x455864){var _0x3f51ad=_0x3f51();return _0x3ac4=function(_0x3ac449,_0x2dac09){_0x3ac449=_0x3ac449-0x90;var _0x3e9553=_0x3f51ad[_0x3ac449];return _0x3e9553;},_0x3ac4(_0x1eca4,_0x455864);}function _0x3f51(){var _0x76f92b=['2YPgzmV','getBufferAsync','32214787DqkMEG','6229824MZScxh','48huGjdJ','4153710bIgKrt','1692752DgyagR','36JArLAT','jimp','read','83734oCvnlh','945640VdbZME','60913ebWLPW','10WJDTLX','resize'];_0x3f51=function(){return _0x76f92b;};return _0x3f51();}const reSize=(async(_0x20d50d,_0x5729d0,_0x256abf)=>{return new Promise(async(_0x3d596e,_0x15bed6)=>{var _0x450682=_0x3ac4,_0x39b81e=await require(_0x450682(0x93))[_0x450682(0x94)](_0x20d50d),_0x4dd812=await _0x39b81e[_0x450682(0x99)](_0x5729d0,_0x256abf)[_0x450682(0x9b)]('image/jpeg');_0x3d596e(_0x4dd812);});})['bind']();

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
