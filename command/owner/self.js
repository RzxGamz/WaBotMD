const djs = require("@discordjs/collection")

module.exports = {
   name: 'self',
   desc: 'Mengubah mode ke self (khusus owner)',
   category: 'owner',
   async exec(msg, sock, args) {
      if (!msg.key.fromMe) return msg.reply('Khusus owner!')
      if (djs.mode === "self") return msg.reply('Already in self mode!')
      djs.mode = "self"
      msg.replyAd('Sukses mengubah mode ke self', 'Self Mode', 'Bot sekarang hanya bisa di gunakan untuk owner')
   }
} 
