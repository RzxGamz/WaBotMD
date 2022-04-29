module.exports = {
  name: 'spam',
  category: 'owner',
  desc: 'Spam pesan',
  async exec(msg, sock, args) {
    if (!args[0]) return msg.reply("Masukkan text dan nomor!")
    let text = args.join(' ')
    let txt = text.split('|')
    for (let i = 0; i < txt[1]; i++) {
      await msg.replyAd(txt[0], 'Spam Message')
    }
  }
}
