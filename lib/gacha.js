const axios = require('axios')
const GACHA_INFO_URL = 'https://hk4e-api-os.mihoyo.com/event/gacha_info/api/'
let gacha_type = {
    standard: 200,
    event_character: 301,
    event_weapon: 302,
    beginner: 100
}

/**
 * Get your wish history
 * @param {*} authkey 
 * @returns 
 */
exports.getWishHistory = async(authkey) => {
    return new Promise((resolve, reject) => {
        axios.get(GACHA_INFO_URL + "getGachaLog", {
            headers: {
                'user-agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/83.0.4103.97 Safari/537.36',
            },
            params: {
                "authkey_ver": "1",
                "sign_type": '2',
                "lang": "en",
                "authkey": authkey,
                "gacha_type": gacha_type.event_character,
                "end_id": '0',
                'size': '20'
            }
        })
        .then(({ data }) => {
            if (data.retcode === -100) {
               return console.log('Invalid authkey or incorrect authkey, please recheck and try again.')
            } else if (data.retcode === -101) {
               return console.log('Authkey timeout, please recheck history page on your genshin impact for updating.')
            } 
            resolve(data)
        })
        .catch(reject)
    })
}
