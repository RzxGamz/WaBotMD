module.exports = {
  name: 'sendvideo',
  alias: ['sendvid'],
  category: 'other',
  desc: 'Mengirim video dari link',
  async exec(msg, sock, args) {
    if (!/https?:\/\//.test(args[0])) return msg.reply('Masukkan link!')
    sock.sendMessage(msg.from, { video: { url: args[0] }, caption: args[0] }, { quoted: msg })
  }
}
