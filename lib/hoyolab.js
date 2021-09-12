const axios = require('axios')

// Links of index
const OVERSEAS_URL = 'https://api-os-takumi.mihoyo.com/'

exports.GenerateDSToken = () => {
    const DS_SALT = '6cqshh5dhw73bzxn20oexa9k516chk7s'
    var date = new Date()
    var time = Math.floor(date.getTime()/1000)
    const r = (Math.random() + 1).toString(36).substring(6);
    var hash = require('crypto').createHash('md5').update(`salt=${DS_SALT}&t=${time}&r=${r}`).digest('hex');
    return `${time},${r},${hash}`
}

exports.GetUserProfile = async(cookie, uid, server) => {
    return new Promise((resolve, reject) => {
        axios.get(OVERSEAS_URL + "game_record/genshin/api/index", {
            headers: {
                'cookie': cookie,
                'user-agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/83.0.4103.97 Safari/537.36',
                'ds': this.GenerateDSToken(),
                'x-rpc-app_version': '1.5.0',
                'x-rpc-client_type': '4',
                'x-rpc-language': 'en-us'
            },
            data: {
                server: server,
                role_id: uid
            }
        })
        .then(({ data }) => {
            resolve(data)
        })
        .catch(reject)
    })
}