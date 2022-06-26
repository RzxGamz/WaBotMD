module.exports = {
   name: 'brainly',
   alias: ['brain'],
   category: 'information',
   desc: 'Menggunakan brainly di whatsapp',
   use: '<pertanyaan>',
   async exec(msg, sock, args) {
      try {
         if (!args.join(' ')) return msg.reply('Masukkan pertanyaan mu!')
         const { Brainly } = require("brainly-scraper-v2");
         const brain = new Brainly("id"); // 'id' - Default to 'id'

         if (args.join(' ').toLowerCase().endsWith("with mt")) {
         brain.searchWithMT(args.join(" "), "id").then(res => {
            msg.replyAd(res, "Brainly", "Temukan jawabanmu di sini!")
         }).catch(console.error);
         } else {
         // Or (You need to enter correctly country code in the constructor).
         brain.search(args.join(" "), "id").then(res => {
            msg.replyAd(res, "Brainly", "Temukan jawabanmu di sini!")
         }).catch(console.error);
         }
      } catch (e) {
         console.log(e)
      }
   }
}
