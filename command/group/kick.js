const djs = require("@discordjs/collection")

module.exports = {
   name: 'kick',
   alias: ['okick','kickmember'],
   category: 'group',
   desc: 'Mengeluarkan member to group',
   use: '<number phone>\nExample: /kick 628xxxxx or reply message',
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
        "remove" // replace this parameter with "remove", "demote" or "promote"
      )
      } else if (msg.quoted) {
      await sock.groupParticipantsUpdate(
        msg.from, 
        [msg.quoted.participant],
        "remove" // replace this parameter with "remove", "demote" or "promote"
      )
      } else {
          msg.reply("Masukkan nomor atau reply pesan!")
      }
   }
}
