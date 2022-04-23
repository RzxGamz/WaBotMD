const fetch = require('node-fetch');
const { format } = require('util');

module.exports = {
  name: 'fetch',
  alias: ['get','inspect'],
  category: 'other',
  desc: 'Fetch code via url',
  use: '<url>\nExample : /fetch https://google.com',
  async exec(msg, sock, args) {
    const { from } = msg
    const text = args.join(' ')
    if (!/^https?:\/\//.test(text)) return msg.reply('Param *URL* must be starts with http:// or https://')
    let url = new URL(text)?.href
    let res = await fetch(url)
    if (res.headers.get('content-length') > 100 * 1024 * 1024 * 1024) throw `Content-Length: ${res.headers.get('content-length')}`
    if (!/text|json/.test(res.headers.get('content-type'))) return sock.sendFileFromUrl(from, url, text, msg)
    let txt = await res.buffer() 
    try {
      txt = format(JSON.parse(txt + ''))
    } catch (e) {
      txt = txt + ''
    } finally {
      msg.reply(txt.slice(0, 65536) + '');
    } 
  }
}
