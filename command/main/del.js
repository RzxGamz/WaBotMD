module.exports = {
   name: 'delete',
   alias: ['del','d'],
   category: 'main',
   desc: 'Menghapus pesan dari bot!',
   use: '<reply message>',
   async exec(msg, sock) {
      if (!msg.quoted.isSelf) return msg.reply('Reply pesan dari bot ini!')
      return msg.quoted.delete()
   }
}
      
