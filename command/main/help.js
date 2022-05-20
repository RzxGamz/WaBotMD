const djs = require("@discordjs/collection")
const moment = require("moment-timezone")
const { sizeFormatter } = require("human-readable")
const fs = require("fs")
const ucap = "Selamat "+ moment(Date.now()).tz('Asia/Jakarta').locale('id').format('a')

const countDownDate = new Date("May, 02, 2022 04:15:00").getTime();
const now = new Date(new Date().getTime() + 25200000).getTime();
const distance = countDownDate - now;
const days = Math.floor(distance / (1000 * 60 * 60 * 24));
const hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
const seconds = Math.floor((distance % (1000 * 60)) / 1000);
const resCountDown = `${days} Hari ${hours} Jam ${minutes} Menit ${seconds} Detik`

let formatd = sizeFormatter({
std: "JEDEC", // 'SI' (default) | 'IEC' | 'JEDEC'
decimalPlaces: 2,
keepTrailingZeroes: false,
render: (literal, symbol) => `${literal} ${symbol}B`,
});
async function cekBandwidth() {
var data = require("node-os-utils")
data = await data.netstat.stats()
let ind = 0
let out = 0
for (let i of data) {
ind = ind + i.inputBytes
out = out + i.outputBytes
}
return {
download: formatd(ind),
upload: formatd(out)
}
}

module.exports = {
    name: "help",
    alias: ["h", "cmd", "menu"],
    category: "main",
    async exec(msg, sock, args) {
        if (args[0]) {
            const data = [];
            const name = args[0].toLowerCase();
            const { commands, prefix } = djs;
            const cmd = commands.get(name) || commands.find((cmd) => cmd.alias && cmd.alias.includes(name));
            if (!cmd || cmd.category === "private") return await msg.reply("No command found");
            else data.push(`*Cmd:* ${cmd.name}`);
            if (cmd.alias) data.push(`*Alias:* ${cmd.alias.join(', ')}`);
            if (cmd.desc) data.push(`*Description:* ${cmd.desc}`);
            if (cmd.use) data.push(`*Usage:* \`\`\`${prefix}${cmd.name} ${cmd.use}\`\`\`\n\nNote: [] = optional, | = or, <> = must filled`);

            return await msg.reply(data.join('\n'));
        } else {
            const { pushName, sender } = msg;
            const { prefix, commands } = djs;
            const cmds = commands.keys()
            let category = [];

            for (let cmd of cmds) {
                let info = commands.get(cmd);
                if (!cmd) continue;
                if (!info.category || info.category === 'private') continue;
                if (Object.keys(category).includes(info.category)) category[info.category].push(info);
                else {
                    category[info.category] = [];
                    category[info.category].push(info);
                }
            }
            let str = `Hello, ${pushName === undefined ? sender.split("@")[0] : pushName}\n${ucap}\n\n*Upload* ${cekBandwidth.upload}\n*Download* ${cekBandwidth.download}\n\n`;
            const keys = Object.keys(category);
            for (const key of keys) {
            	let anu = key[0].toUpperCase()
                str += `*${anu}${key.slice(1)}*\n${category[key]
                    .map((cmd) => `≻ ${prefix}`+cmd.name).join('\n')}\n\n`
            }
            str += `_send ${prefix}help followed by a command name to get detail of command, e.g. ${prefix}help sticker_`;
            await sock.sendMessage(msg.from, {
                text: str,
                footer: "WhatsApp Bot",
                /*templateButtons: [
                    { urlButton: { displayText: "Source Code", url: "https://github.com/RzxGamz/WaBotMD" } }
                ],*/
            contextInfo: { 
    mentionedJid: [msg.sender],
    externalAdReply: {
    mediaUrl: `https://instagram.com`,
    mediaType: 2,
    description: '', 
    title: 'WhatsApp Bot',
    body: '', 
    thumbnail: fs.readFileSync('././lib/media/program.jpg'),
    sourceUrl: `https://chat.whatsapp.com/FM1Q7xQJYN5HDSrXvQqMEn`,
    showAdAttribution: true
     }}
           })
        }
    }
}
