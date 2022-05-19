module.exports = {
   name: 'gitclone',
   category: 'downloader',
   desc: 'Download github repository',
   use: '<link github repo>',
   async exec(msg, sock, args) {
      let regx = /(?:https|git)(?::\/\/|@)github\.com[\/:]([^\/:]+)\/(.+)/i
      if (!args[0]) return msg.reply('Masukkan link github repo!')
      if (!regx.test(args[0])) return msg.reply('Link salah!')
      let [, user, repo] = args[0].match(regx) || []
      repos = repo.replace(/.git$/, '')
      let hasdl = `https://api.github.com/repos/${user}/${repos}/zipball`
      sock.sendMessage(msg.from, { document: { url: hasdl }, mimetype: 'application/zip', fileName: repos+'.zip' }, { quoted: msg })
   }
}
