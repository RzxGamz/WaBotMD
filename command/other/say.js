module.exports = {
	name: 'say',
	alias: ['ucap'],
	category: 'other',
	desc: 'Bot akan mengetik apa yang kamu ketik',
	use: '<text>',
	async exec(msg, sock, args, arg) {
		msg.reply(msg.body.slice(4))
	}
}