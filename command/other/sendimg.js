module.exports = {
  name: 'sendimage',
  alias: ['sendimg'],
  category: 'other',
  desc: 'Mengirim foto dari link',
  use: '<link image>',
  async exec(msg, sock, args) {
    if (!/https?:\/\//.test(args[0])) return msg.reply('Masukkan link!')
    sock.sendMessage(msg.from, { image: { url: args[0] }, caption: args[0] }, { quoted: msg })
  }
}
