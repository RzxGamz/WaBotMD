const { playstore } = require("hxz-api")

module.exports = {
   name: 'playstore',
   category: 'search',
   desc: 'Mencari aplikasi di playstore',
   use: '<name apk>',
   async exec(msg, sock, args) {
      try {
        const res = await playstore(args.join(" "))
        /*
        let txt = ""
        for (let ps of res) {
        txt += `Name : ${ps.name}\n`
        txt += `Link : ${ps.link}\n`
        txt += `Developer : ${ps.developer}\n`
        txt += `Link Dev : ${ps.link_dev}\n\n`
        }
        */
        msg.replyAd(JSON.stringify(res, null, 2), 'Playstore Search', 'Search playstore on WhatsApp')
      } catch (e) {
          msg.reply(`Something bad happend\n${e.message}`)
      }
   }
}
