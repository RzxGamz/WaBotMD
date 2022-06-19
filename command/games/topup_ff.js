const hikki = require('hikki-me')

module.exports = {
   name: 'topup_ff',
   category: 'games',
   use: '<diamond> <id ff>',
   async exec(msg, sock, args) {
     try {
      async function topupFF(dm, id) {
         const num = msg.sender.split("@")[0]
         const makeSession = await hikki.game.topupFreeFire(id, dm) // support nominal 5 12 70 140 355 720'
         // console.log(makeSession) if get more property
         return await hikki.game.payDiamond(makeSession, msg.sender.startsWith('62') ? "0"+num.slice(2) : num)
      }
      topupFF(args[0], args[1]).then(res => {
      sock.sendMessage(msg.from, { image: { url: res.qrCode }, caption: `*Top Up Free Fire*\n\nId : ${args[1]}\nDiamond : ${args[0]}\nPayment : QRIS\nTimer : 30 s\n\n_Silahkan scan qr code di atas untuk pembayaran diamond free fire_`})
      })
     } catch (e) {
      console.log(e)
     }
   }
}
