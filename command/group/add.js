const djs = require("@discordjs/collection")

module.exports = {
   name: 'add',
   alias: ['oadd','addmember'],
   category: 'group',
   desc: 'Menambah member to group',
   use: '<number phone>\nExample: /add 628xxxxx',
   async exec(msg, sock, args) {
      if (!msg.isGroup) throw djs.mess.group
      if (!msg.isAdmins) throw djs.mess.admin
      if (!msg.isBotAdmins) throw djs.mess.badmin
      if (args[0].startsWith("0")) throw "Masukkan kode negara"
      // id & people to add to the group (will throw error if it fails)
      const response = await sock.groupParticipantsUpdate(
        msg.from, 
        [args[0]+"@s.whatsapp.net"],
        "add" // replace this parameter with "remove", "demote" or "promote"
      )
      msg.reply(response)
   }
}
