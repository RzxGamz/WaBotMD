const { playstore } = require("hxz-api")

module.exports = {
   name: 'playstore',
   category: 'search',
   desc: 'Mencari aplikasi di playstore',
   use: '<name apk>',
   async exec(msg, sock, args) {
      try {
        const res = await playstore(args.join(" "))
        let txt = ""
        for (let ps of res) {
        txt += `Name : ${ps.name}\n`
        txt += `Link : ${ps.link}\n`
        txt += `Developer : ${ps.developer}\n`
        txt += `Link Dev : ${ps.link_dev}\n\n`
        }
        sock.sendMessage(msg.from, { text: txt, contextInfo: { 
         externalAdReply: {
          mediaUrl: `https://instagram.com`,
          mediaType: 2,
          description: '', 
          title: 'Playstore Search',
          body: '', 
          thumbnail: require('fs').readFileSync('././lib/media/program.jpg'),
          sourceUrl: `https://chat.whatsapp.com/FM1Q7xQJYN5HDSrXvQqMEn`,
          showAdAttribution: true
          }
       }}, { quoted: msg })
      } catch (e) {
          msg.reply(`Something bad happend\n${e.message}`)
      }
   }
}
