const baileys = require("@adiwajshing/baileys")

module.exports = {
   name: 'script',
   alias: ['sc','source','sourcecode'],
   category: 'main',
   desc: 'Source code this bot',
   async exec(msg, sock) {
      global.payMessage = baileys.generateWAMessageFromContent(msg.from, baileys.proto.Message.fromObject({
"requestPaymentMessage": {
  currencyCodeIso4217: 'IDR',
  amount1000: '100000000000',
  requestFrom: msg.sender,
  noteMessage: {
    extendedTextMessage: {
      text: `*Hello ${msg.pushName}*\n\n_Bot ini menggunakan source code_\n\nhttps://github.com/RzxGamz/WaBotMD\n\n*Thanks To*\n• Faiz Bastomi\n• RzxGamz`
    }
  },
  expiryTimestamp: '0',
  amount: { value: '100000000', offset: 1000, currencyCode: 'IDR' }
}}), { userJid: msg.from })
sock.relayMessage(msg.from, payMessage.message, { messageId: payMessage.key.id })
   }
}
