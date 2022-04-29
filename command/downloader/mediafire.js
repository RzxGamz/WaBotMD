const axios = require('axios')
const mime = require('mime-types')
const cheerio = require('cheerio')

module.exports = {
   name: 'mediafire',
   alias: ['mediafiredl'],
   category: 'downloader',
   desc: 'Download file mediafire',
   use: '<link mediafire>',
   async exec(msg, sock, args) {
	if (!args[0]) return msg.reply('Masukkan link mediafire!')
	mediafireDl(args[0]).then(async (res) => {
		await msg.replyAd(JSON.stringify(res, null, 2), 'Mediafire Downloader', 'Download Mediafire on WhatsApp')
                let sizex = res.size.replace("MB", "")
                if (sizex > 500) return msg.reply("Maaf, ukuran file ini melebihi batas download bot kami!")
		let mimetype = await mime.lookup(res.link)
		await sock.sendMessage(msg.from, { document: { url: res.link }, mimetype }, { quoted: msg, filename: res.title })
	}).catch(e => msg.reply(String(e)))
   }
}

function mediafireDl(url) {
	return new Promise((res, rej) => {
		if (!/https?:\/\//.test(url) && !url.includes('mediafire')) return rej('Invalid url!')
		axios(url).then(c => {
			let $ = cheerio.load(c.data)
			let title = $('div.dl-btn-label').attr('title')
			let size = $('a#downloadButton').text().split('\n')[1].replace(/ /g, '').replace(/\(|\)/g, '').replace('Download', '')
			let link = $('a#downloadButton').attr('href')
			res({ title, size, link })
		}).catch(rej)
	})
}
