module.exports = {
   name: 'topupff',
   alias: ['topupfreefire'],
   category: 'games',
   desc: 'Topup Game Free Fire',
   use: '<id free fire>',
   async exec(msg, sock, args, arg) {
      if (!args[0]) return msg.reply("Masukkan id free fire!")
      const sections = [
    {
	title: "TOP UP DIAMOND FREE FIRE",
	rows: [
	    {title: "5 Diamond", rowId: `.topup_ff 5 ${args[0]}`, description: "Payment QRIS"},
	    {title: "12 Diamond", rowId: `.topup_ff 12 ${args[0]}`, description: "Payment QRIS"},
            {title: "70 Diamond", rowId: `.topup_ff 70 ${args[0]}`, description: "Payment QRIS"},
            {title: "140 Diamond", rowId: `.topup_ff 140 ${args[0]}`, description: "Payment QRIS"},
            {title: "355 Diamond", rowId: `.topup_ff 355 ${args[0]}`, description: "Payment QRIS"}
	]
    }
  ]

  const listMessage = {
     text: `Hallo ${msg.pushName}, Tinggal selangkah lagi! Dengan membeli Diamond, Kamu bisa menikmati beragam fitur dalam game, seperti membeli skin terbaru, item in-game premium, karakter baru, event eksklusif, dan masih banyak lagi!`,
     footer: "Rzx Bot",
     title: "Top Up Game Free Fire",
     buttonText: "Tap in here!",
     sections
  }

  sock.sendMessage(msg.from, listMessage, { quoted: msg })
   }
}
