const djs = require("@discordjs/collection")

module.exports = {
   name: 'add',
   alias: ['oadd','addmember'],
   category: 'group',
   desc: 'Menambah member to group',
   use: '<number phone>\nExample: /add 628xxxxx',
   async exec(msg, sock, args) {
      const groupMetadata = msg.isGroup ? sock.groupMetadata(msg.from) : ''
      const groupMembers = msg.isGroup ? groupMetadata.participants : ''
      const groupAdmins = msg.isGroup ? getGroupAdmins(groupMembers) : ''
      const isAdmins = groupAdmins.includes(msg.sender);
      const isBotAdmins = groupAdmins.includes(sock.user.id.split(':')[0]+'@s.whatsapp.net');

      if (!msg.isGroup) return msg.reply("Maaf command ini khusus di dalam group!")
      if (!isAdmins) return msg.reply("Maaf command ini khusus admin group!")
      if (!isBotAdmins) return msg.reply("Bot belum menjadi admin!")

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
        "add" // replace this parameter with "remove", "demote" or "promote"
      )
      } else {
          msg.reply("Masukkan nomor atau reply pesan!")
      }
   }
}
