const axios = require('axios')

module.exports = {
  name: 'npm',
  alias: ['npms', 'npmjs', 'npmsearch'],
  category: 'search',
  use: '<package name>',
  async exec(msg, sock, args) {
    if (!args.join(' ')) return msg.reply('Query Needed')
    axios.get(`https://api.npms.io/v2/search?q=${args.join(' ')}`).then(({ data }) => {
      let txt = data.results.map(({ package: pkg }) => `*${pkg.name}* (v${pkg.version})\n_${pkg.links.npm}_\n_${pkg.description}_`).join('\n\n')
      msg.reply(txt)
    }).catch(e => msg.reply(String(e)))
  }
}
