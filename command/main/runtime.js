const { runtime } = require("../../lib/function/func")

module.exports = {
   name: 'runtime',
   category: 'main',
   desc: 'Menampilkan waktu berjalannya bot',
   async exec(msg, sock) {
      const upt = runtime(process.uptime())
      msg.reply(`Runtime: ${upt}`)
   }
}
