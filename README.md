<div align="center">
<img src="https://img.freepik.com/free-vector/programmer-s-workplace-writing-code-laptop_80328-238.jpg?size=626&ext=jpg&ga=GA1.2.608251545.1650126419" width="400" height="250" border="0" alt="PFFP">


# WhatsApp Bot Multi Device

## [![JavaScript](https://img.shields.io/badge/JavaScript-d6cc0f?style=for-the-badge&logo=javascript&logoColor=white)](https://javascript.com) [![NodeJS](https://img.shields.io/badge/Node.js-43853D?style=for-the-badge&logo=node.js&logoColor=white)](https://nodejs.org/) [![discord.js](https://img.shields.io/badge/discord.js-0026a3?style=for-the-badge&logo=discord&logoColor=white)](https://discord.js.org)

> Build with Baileys and DiscordJs ( as a command handler ) <br />

</div><br />
<br />



## Options

Options pada command, yang akan mempermudah kamu untuk membuat/menambahkan fitur<br />
```js
{
   name: <String>, // Ex: "menu"
   alias: <Array>, // Ex: ["cmd","help"]
   desc: <String>, // Ex: "Menu adalah command"
   use: <String>,  // Ex: "<teks>"
   category: <String>, // Ex: "main"
   exec: [AsyncFunction: exec]
}
```

## Example Options

Example From Command : [`./command/main/help.js`](https://github.com/RzxGamz/WaBotMD/blob/main/command/main/help.js)<br />
```js
{
  name: "help",
  alias: ["h","menu","cmd"],
  desc: "menampilkan menu",
  category: "main"
  async exec(msg) {
     msg.reply("Hello World!")
  }
}
```

## Highlights

- [√] Simple Penggunaan
- [√] Mudah digunakan
- [√] Mudah untuk dirawat/diperbaiki
- [√] Tidak mudah overload
- [√] Command terpisah

## Request or report
Untuk request dan report bisa chat saya disini [Whatsapp](https://wa.me/6283821902942)

## Installation

### Dibutuhkan
1. [nodejs](https://nodejs.org/en/download) 16x/17x
2. [ffmpeg](https://ffmpeg.org)
3. [libWebP](https://developers.google.com/speed/webp/download)

### Clone Repo
```bash
# cloning repo
git clone https://github.com/RzxGamz/WaBotMD

# ubah posisi direktori
cd WaBotMD

# install semua module
npm install
# atau
yarn install

# start bot
npm start
# atau
node .
```


# Thanks To

- [`Faiz Bastomi`](https://github.com/FaizBastomi)  Base Ori
- [`RzxGamz`](https://github.com/RzxGamz)  Copy Base
