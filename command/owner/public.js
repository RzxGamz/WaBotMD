const djs = require("@discordjs/collection")

module.exports = {
   name: 'public',
   desc: 'Mengubah mode ke public (untuk semua user)',
   category: 'owner',
   async exec(msg, sock, args) {
      if (!msg.key.fromMe) return msg.reply('Khusus owner!')
      if (djs.mode === "public") return msg.reply('Already in public mode!')
      djs.mode = "public"
      msg.replyAd('Sukses mengubah mode ke public', 'Public Mode', 'Bot sekarang bisa di gunakan untuk semua user')
   }
} 
