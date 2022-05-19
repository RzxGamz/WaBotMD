const { extractImageThumb } = require("@adiwajshing/baileys")

module.exports = {
   name: 'loc',
   async exec(msg, sock) {
      sock.sendMessage(msg.from, { location: { degreesLatitude: 0, degreesLongitude: 0, jpegThumbnail: extractImageThumb('././lib/media/program.jpg') }, text: "Hello", footer: "World", buttons: [{buttonId: "Test", buttonText: { displayText: "RZX" }, type: 1}] })
   }
}
