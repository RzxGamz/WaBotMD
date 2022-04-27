module.exports = {
   name: 'zippyshare',
   alias: ['zs','zippydl'],
   category: 'downloader',
   desc: 'Download file zippyshare',
   use: '<link zippyshare>',
   async exec(msg, sock, args) {
	try {
		if (!args[0]) return msg.reply('Masukkan link zippyshare!')
		await msg.reply('*Loading . . .*')
		let { download, filename } = await require('zs-extract').extract(args[0])
		let mimetype = await require('mime-types').lookup(download)
		await sock.sendMessage(msg.from, { document: { url: download }, mimetype }, { quoted: msg, filename })
	} catch (e) {
	      msg.reply(String(e))
	}
   }
}
