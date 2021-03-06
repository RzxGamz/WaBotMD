const { fetchJson } = require("../../lib/function/func")

module.exports = {
   name: 'cuttly',
   alias: ['tocuttly','cutt.ly'],
   category: 'other',
   desc: 'Mempersingkat link kamu di cutt.ly',
   use: '<link>',
   async exec(msg, sock, args) {
     if (!args.join(' ') && !/^https?:\/\//.test(args.join(' '))) return msg.reply("Masukkan link!")
        try {
          const res = await fetchJson(`https://cutt.ly/api/api.php?key=341578d2de946244680120edd9d03f068dd38&short=${args.join(' ')}`)
	  msg.replyAd(JSON.stringify(res, null, 2), 'Cuttly Shortlink', 'Shortlink cuttly on WhatsApp')
	} catch (e) {
	    msg.reply(e.message)
      }
   }
}
