const djs = require("@discordjs/collection")

module.exports = {
   name: 'kick',
   alias: ['okick','kickmember'],
   category: 'group',
   desc: 'Mengeluarkan member to group',
   use: '<number phone>\nExample: /kick 628xxxxx or reply message',
   async exec(msg, sock, args) {
      if (!msg.isGroup) throw djs.mess.group
      if (!msg.isAdmins) throw djs.mess.admin
      if (!msg.isBotAdmins) throw djs.mess.badmin
      if (args[0].startsWith("0")) throw "Masukkan kode negara"
      if (args[0]) {
      // id & people to add to the group (will throw error if it fails)
      await sock.groupParticipantsUpdate(
        msg.from, 
        [args[0]+"@s.whatsapp.net"],
        "remove" // replace this parameter with "remove", "demote" or "promote"
      )
      } else if (msg.quoted) {
      await sock.groupParticipantsUpdate(
        msg.from, 
        [msg.quoted.participant],
        "remove" // replace this parameter with "remove", "demote" or "promote"
      )
      }
   }
}
