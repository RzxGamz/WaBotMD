module.exports = {
   name: 'owner',
   alias: ['creator','developer'],
   category: 'main',
   desc: 'Menampilkan contact owner bot',
   async exec(msg, sock, args, arg) {
      const vcard = 'BEGIN:VCARD\n' // metadata of the contact card
            + 'VERSION:3.0\n' 
            + 'FN:RzxGamz\n' // full name
            + 'ORG:Programmer;\n' // the organization of the contact
            + 'TEL;type=CELL;type=VOICE;waid=1 551 786 8060:+1 551 786 8060\n' // WhatsApp ID + phone number
            + 'END:VCARD'
      sock.sendMessage(
      msg.from,
        { 
           contacts: { 
            displayName: 'Jeff', 
            contacts: [{ vcard }] 
           }
        }, { quoted: msg }
      )
   }
}
