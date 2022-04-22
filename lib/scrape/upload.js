const fetch = require('node-fetch');
const FormData = require('form-data');
const { fromBuffer } = require('file-type');
const axios = require("axios");
const qs = require("qs");
const fs = require("fs");

exports.uptoturu = async(base64) => {
    return new Promise((resolve, reject) => {
        axios.post("https://turupedia.net/api/1/upload", qs.stringify({
            key: "turunet",
            source: base64,
            format: "json"
        }),
            {
                headers: {
                    "user-agent": "Mozilla/5.0 (Windows NT 6.1; WOW64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/91.0.4472.114 Safari/537.36"
                }
            }
        )
        .then(({data}) => resolve(data))
        .catch(reject)
    })
}

exports.uptoaqulz = async(path) => {
    let form = new FormData();
    form.append('apikey', "XinzBot")
    form.append('fileToUpload', fs.createReadStream(path))
    let data = await axios({ method: "POST", url: "https://justaqul.xyz/upload",data: form, headers: { 'Content-Type': `multipart/form-data; boundary=${form._boundary}`}})
    return data.data.result
}

exports.uptotele = async(media) => {
    return new Promise(async (resolve, reject) => {
    try {
        let { ext } = await fromBuffer(media)
        console.log('Uploading image to server telegra.ph')
        let form = new FormData()
        form.append('file', media, 'tmp.' + ext)
        await fetch('https://telegra.ph/upload', {
            method: 'POST',
            body: form
        })
        .then(res => res.json())
        .then(res => {
            if (res.error) return reject(res.error)
            resolve('https://telegra.ph' + res[0].src)
        })
        .catch(err => reject(err))
    } catch (e) {
        return console.log(e)
    }
})
}
