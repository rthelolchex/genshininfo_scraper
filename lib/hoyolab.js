const axios = require('axios')
const fs = require('fs')

// Links of index
const OVERSEAS_URL = 'https://api-os-takumi.mihoyo.com/'
const REEDEM_URL = 'https://hk4e-api-os.mihoyo.com/common/apicdkey/api/webExchangeCdkey'

/**
 * Recognize your server where you playing at.
 * @param {*} uid 
 * @returns 
 */
 exports.recognize_server = async(uid) => {
    let server = {
        1:'cn_gf01',
        5:'cn_qd01',
        6:'os_usa',
        7:'os_euro',
        8:'os_asia',
        9:'os_cht',
    }
    if (server[uid[0]]) {
        return server[uid[0]]
    }
    else return `UID ${uid} isn't associated with any server, please try again!`
}

exports.GenerateDSToken = () => {
    const DS_SALT = '6cqshh5dhw73bzxn20oexa9k516chk7s'
    var date = new Date()
    var time = Math.floor(date.getTime()/1000)
    const r = (Math.random() + 1).toString(36).substring(6);
    var hash = require('crypto').createHash('md5').update(`salt=${DS_SALT}&t=${time}&r=${r}`).digest('hex');
    return `${time},${r},${hash}`
}

/**
 * Get your user profile
 * @param {*} cookie 
 * @param {*} uid 
 * @returns 
 */
exports.GetUserProfile = async(cookie, uid) => {
    server = await this.recognize_server(uid)
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
            if (data.retcode === -10001) {
                return console.log('Invalid request, maybe cookie invalid?')
            }
            resolve(data)
        })
        .catch(reject)
    })
}

/**
 * Claim a reedem code for your account
 * @param {*} cookie 
 * @param {*} uid 
 * @param {*} reedemcode 
 * @returns 
 */
exports.ClaimReedemCode = async(cookie, uid, reedemcode) => {
    server = await this.recognize_server(uid)
    return new Promise((resolve, reject) => {
        axios.get(REEDEM_URL, {
            headers: {
                'cookie': cookie,
                'user-agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/83.0.4103.97 Safari/537.36',
            },
            params: {
                'uid': uid,
                'region': server,
                'lang': 'id',
                'cdkey': reedemcode,
                'game_biz': 'hk4e_global'
            }
        })
        .then(({ data }) => {
            resolve(data)
        })
        .catch(reject)
    })
}

/**
 * Get your spiral abyss info
 * @param {*} uid 
 * @param {*} schedule 
 * @returns 
 */
exports.spiralAbyss = async(cookie, uid, schedule) => {
    server = await this.recognize_server(uid)
    return new Promise((resolve, reject) => {
        axios.get(OVERSEAS_URL + "game_record/genshin/api/spiralAbyss", {
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
                role_id: uid,
                schedule_type: schedule
            }
        })
        .then(({ data }) => {
            if (data.retcode === -10001) {
                return console.log('Invalid request, maybe cookie invalid?')
            }
            resolve(data)
        })
        .catch(reject)
    })
}


/**
 * Get characters from chara id
 * @param {*} cookie
 * @param {*} uid
 * @returns 
 */
exports.getCharacters = async(cookie, uid) => {
    const data = await this.GetUserProfile(cookie, uid)
    const res = data.data.avatars
    const characters_name_FiveStar = []
    const characters_name_FourStar = []
    res.forEach(characters => {
        if (characters.rarity === 5) {
            let fivestr = `${characters.name} | ${characters.element} | Level ${characters.level} | Friendship Level ${characters.fetter} | C${characters.actived_constellation_num}`.trim()
            characters_name_FiveStar.push(fivestr)
        }
        if (characters.rarity === 4) {
            let fourstr = `${characters.name} | ${characters.element} | Level ${characters.level} | Friendship Level ${characters.fetter} | C${characters.actived_constellation_num}`.trim()
            characters_name_FourStar.push(fourstr)
        }
    })
    let result = { characters_name_FiveStar, characters_name_FourStar }
    return result
}