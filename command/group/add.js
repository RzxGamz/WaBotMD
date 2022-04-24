const djs = require("@discordjs/collection")

module.exports = {
   name: 'add',
   alias: ['oadd','addmember'],
   category: 'group',
   desc: 'Menambah member to group',
   use: '<number phone>\nExample: /add 628xxxxx',
   async exec(msg, sock, args) {
      if (!msg.isGroup) throw "Maaf command ini khusus di dalam group!"
      if (!msg.isAdmins) throw "Maaf command ini khusus admin group!"
      if (!msg.isBotAdmins) throw "Bot belum menjadi admin!"
      if (args[0].startsWith("0")) throw "Masukkan kode negara"
      if (args[0]) {
      // id & people to add to the group (will throw error if it fails)
      await sock.groupParticipantsUpdate(
        msg.from, 
        [args[0]+"@s.whatsapp.net"],
        "add" // replace this parameter with "remove", "demote" or "promote"
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
