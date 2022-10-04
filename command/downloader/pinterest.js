const { fetchJson } = require('../../lib/function/func.js')

module.exports = {
   name: 'pinterestdl',
   alias: ['pindl'],
   category: 'downloader',
   desc: 'Download media pinterest',
   use: '<link pinterest>',
   async exec(msg, sock, args) {
      msg.reply("Loading. . .")
      let pin = await fetchJson(`https://api.zekais.com/pinterestdl?url=${args[0]}&apikey=zekais`)
      if (pin.type === "image") {
          sock.sendMessage(msg.from, { image: { url: pin.result }, caption: pin.result }, { quoted: msg })
      } else if (pin.type === "video") {
          sock.sendMessage(msg.from, { video: { url: pin.result }, caption: pin.result }, { quoted: msg })
      } else if (pin.type === "gif") {
          sock.sendMessage(msg.from, { video: { url: pin.result }, caption: pin.result, gifPlayBack: true }, { quoted: msg })
      } else {
          msg.reply("Error")
      }
   }
}
