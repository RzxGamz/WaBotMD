const speed = require('performance-now')

module.exports = {
   name: 'speed',
   alias: ['ping'],
   category: 'main',
   desc: 'Testing speed bot',
   async exec(msg, sock) {
     const timestampi = speed();
     const latensyi = speed() - timestampi
     msg.reply(`Speed: ${latensyi.toFixed(4)} Second`)
   }
}
