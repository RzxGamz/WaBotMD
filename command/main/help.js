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

const formatd = sizeFormatter({
std: "JEDEC", // 'SI' (default) | 'IEC' | 'JEDEC'
decimalPlaces: 2,
keepTrailingZeroes: false,
render: (literal, symbol) => `${literal} ${symbol}B`,
})

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

function _0x4be7(){var _0x3b4e84=['getBufferAsync','resize','1413416QPSVnB','500996PyFtAc','134502xlRKrW','182jlgrYU','1374096dcsaAb','147624FGZVVi','MIME_JPEG','3563975vMNdIp','669654idWkVa','52dMsWwj'];_0x4be7=function(){return _0x3b4e84;};return _0x4be7();}function _0x2be6(_0x3f99d7,_0x62130c){var _0x4be72a=_0x4be7();return _0x2be6=function(_0x2be640,_0xec8f4d){_0x2be640=_0x2be640-0xb5;var _0x2dc9aa=_0x4be72a[_0x2be640];return _0x2dc9aa;},_0x2be6(_0x3f99d7,_0x62130c);}(function(_0x514919,_0x2b4e0c){var _0x54dc81=_0x2be6,_0x2f320e=_0x514919();while(!![]){try{var _0x348271=parseInt(_0x54dc81(0xbd))/0x1+-parseInt(_0x54dc81(0xc0))/0x2+-parseInt(_0x54dc81(0xbe))/0x3*(-parseInt(_0x54dc81(0xb9))/0x4)+parseInt(_0x54dc81(0xb7))/0x5+parseInt(_0x54dc81(0xb5))/0x6*(-parseInt(_0x54dc81(0xbf))/0x7)+-parseInt(_0x54dc81(0xbc))/0x8+parseInt(_0x54dc81(0xb8))/0x9;if(_0x348271===_0x2b4e0c)break;else _0x2f320e['push'](_0x2f320e['shift']());}catch(_0x531074){_0x2f320e['push'](_0x2f320e['shift']());}}}(_0x4be7,0x59bfa));const reSize=(async(_0xaa12ff,_0x564bb5,_0x3b83eb)=>{return new Promise(async(_0x26a4a4,_0x2b71dd)=>{var _0x5b918a=_0x2be6,_0x170259=await jimp['read'](_0xaa12ff),_0x151dd4=await _0x170259[_0x5b918a(0xbb)](_0x564bb5,_0x3b83eb)[_0x5b918a(0xba)](jimp[_0x5b918a(0xb6)]);_0x26a4a4(_0x151dd4);});})['bind']();

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
            let cB = await cekBandwidth()
            let str = `*Hello, ${pushName === undefined ? sender.split("@")[0] : pushName}*\n*${ucap}*\n\n*STATISTIC*\n*Upload ${cB.upload}*\n*Download ${cB.download}*\n\n`;
            const keys = Object.keys(category);
            for (const key of keys) {
            	let anu = key[0].toUpperCase()
                str += `*${anu}${key.slice(1)}*\n${category[key]
                    .map((cmd) => `≻ ${prefix}`+cmd.name).join('\n')}\n\n`
            }
            str += `_send ${prefix}help followed by a command name to get detail of command, e.g. ${prefix}help sticker_`;
            /*await sock.sendMessage(msg.from, {
                text: str,
                footer: "WhatsApp Bot",
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
           })*/
           let buffer = reSize(fs.readFileSync('././lib/media/gta.jpg'), 200, 200)
           await sock.sendMessage(msg.from, { caption: str, footer: "Rzx Bot", location: { jpegThumbnail: buffer }, buttons: [{ buttonId: ".script", buttonText: { displayText: "Source Code" }, type: 1 }], headerType: 'LOCATION', mentions: [msg.sender] })
        }
    }
}
