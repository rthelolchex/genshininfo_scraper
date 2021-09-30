const axios = require('axios')
const recognizeErrorCode = require('./recognizeErrorCode')

// Links of index
const OVERSEAS_URL = 'https://api-os-takumi.mihoyo.com/'
const REEDEM_URL = 'https://hk4e-api-os.mihoyo.com/common/apicdkey/api/webExchangeCdkey'

const GACHA_INFO_URL = 'https://hk4e-api-os.mihoyo.com/event/gacha_info/api/'
const wishes = [
    {
        key: '301', name: 'Character Event Wish'
    },
    {
        key: '302', name: 'Weapon Event Wish'
    },
    {
        key: '200', name: 'Permanent Wish'
    }
];

const reason = require('../reason.json')

const YSULOG_URL = 'https://hk4e-api-os.mihoyo.com/ysulog/api/'

// Links of the daily check in and the act_id from the server
const OS_URL = 'https://hk4e-api-os.mihoyo.com/event/sol/'
const OS_ACT_ID = 'e202102251931481'

/**
 * Recognize your server where you playing at.
 * @param {*} uid 
 * @returns 
 */
 exports.recognize_server = async(uid) => {
    if (!uid) throw new Error("Please fill UID!")
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
    else throw new Error(`UID ${uid} isn't associated with any server, please try again!`)
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
    try {
        let data = false
        let attempt = 0
        let retry = function() {
            if (attempt > 3) {
                throw new Error("Error when trying to get data, please recheck your cookie token or uid!")
            }
            if (data.retcode === -10001) {
                console.log("Invalid request, retrying...")
                return attempt += 1
            } else throw recognizeErrorCode('general', data.retcode)
        }
        do {
            console.log("Attempting to login...", "Attempt :", attempt)
            const { data: html } = await axios.get(OVERSEAS_URL + "game_record/genshin/api/index", {
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
            data = html
        } while(retry())
        if (!data) return
        return data
    } catch (e) {
        console.log(e)
    }
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
    const { data: html } = await axios.get(REEDEM_URL, {
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
    if (html.data === null) {
        return recognizeErrorCode('redeemCode', html.retcode)
    }
    return html
}

/**
 * Get your spiral abyss info
 * @param {*} cookie
 * @param {*} uid 
 * @param {*} schedule 
 * @returns 
 */
exports.spiralAbyss = async(cookie, uid, schedule) => {
    server = await this.recognize_server(uid)
    try {
        let data = false
        let attempt = 0
        let retry = function() {
            if (attempt > 3) {
                throw new Error("Error when trying to get data, please recheck your cookie token or uid!")
            }
            if (data.retcode === -10001) {
                console.log("Invalid request, retrying...")
                return attempt += 1
            } else throw recognizeErrorCode('spiralAbyss', data.retcode)
        }
        do {
            console.log("Attempting to login...", "Attempt :", attempt)
            const { data: html } = await axios.get(OVERSEAS_URL + "game_record/genshin/api/spiralAbyss", {
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
            data = html
        } while(retry())
        if (!data) return
        return data
    } catch (e) {
        console.log(e)
    }
}


/**
 * Decode auth key from gacha history url
 * @param {*} url 
 * @returns 
 */
exports.decryptAuthKey = async(url) => {
    const decodeText = decodeURIComponent(url);
    const authRegex = /authkey=([^&]+)/g;
    const matchText = decodeText.match(authRegex);
    const authkey = matchText[0].replace('authkey=', '');
    return authkey;
}


const getGachaLog = async ({ wish, page, endId }, authkey) => {
    try {
        const params = {
            "authkey_ver": 1,
            "lang": "en",
            "authkey": authkey,
            "gacha_type": wish.key,
            "page": page,
            "size": 20
        }
        if (endId) {
            params.end_id = endId;
        }
        const response = await axios.get(`${GACHA_INFO_URL}getGachaLog`, {
            headers: {
                // recommended header
                "user-agent":"Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/58.0.3029.110 Safari/537.36"
            },
            params: params
        });
        const result = response.data;
        if (result.data === null) {
            throw new Error(`Cannot get your gacha data because: ${result.message}! Please try again later.`);
        } else {
            return result.data.list;
        }
    } catch (error) {
        console.log(error.message);
    }
}

const getGachaLogs = async (wish, authkey) => {
    try {
        let page = 1;
        let list = [];
        let result = [];
        let endId = 0;
        let defaultCondition = function () {
            return list.length > 0;
        }
        do {
            console.log(`Process ${wish.name} with page number ${page}`);
            list = await getGachaLog({ wish, page, endId }, authkey);
            result.push(...list);
            page += 1;
            if (result.length > 0) {
                endId = BigInt(result[result.length - 1].id);
            }
        } while (defaultCondition());
        return result;
    } catch (error) {
        console.log(error);
    }
}

/**
 * Get your wish history
 * @param {*} authkey 
 * @returns 
 */
exports.getWishHistory = async (authkey) => {
    try {
        const collectResult = [];
        for (let x = 0; x < wishes.length; x++) {
            const gachaLogs = await getGachaLogs(wishes[x], authkey);
            // Sorted in ASC mode
            const sortedGachaLogs = gachaLogs.sort((a, b) => (BigInt(a.id) < BigInt(b.id)) ? -1 : ((BigInt(a.id) > BigInt(b.id)) ? 1 : 0));
            const newResult = [];
            for (let index = 0; index < sortedGachaLogs.length; index++) {
                const element = sortedGachaLogs[index];
                const newElement = {
                    'time': element.time,
                    'name': element.name,
                    'type': element.item_type,
                    'rank': element.rank_type
                }
                newResult.push(newElement);
            }
            collectResult.push(newResult);
        }
        return collectResult;
    } catch (error) {
        console.log(error);
    }
};

/**
 * Get daily reward information from your account
 * @param {*} cookie 
 * @returns
 */
 exports.getDailyRewardInfo = async (cookie) => {
    return new Promise((resolve, reject) => {
        axios.get(OS_URL + "info", {
            headers: {
                'cookie': cookie,
                'user-agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/83.0.4103.97 Safari/537.36',
            },
            params: {
                act_id: OS_ACT_ID,
            }
        })
        .then(({ data }) => {
            resolve(data)
        })
        .catch(reject)
    })
}


/**
 * Get list claimed daily check-in on your account
 * @param {*} cookie 
 * @returns 
 */
exports.getClaimedRewards = async (cookie) => {
    return new Promise((resolve, reject) => {
        axios.get(OS_URL + "award", {
            headers: {
                'cookie': cookie,
                'user-agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/83.0.4103.97 Safari/537.36',
            },
            params: {
                act_id: OS_ACT_ID,
                current_page: 1
            }
        })
        .then(({ data }) => {
            resolve(data)
        })
        .catch(reject)
    })
}

/**
 * Claim your daily check-in
 * @param {*} cookie 
 * @returns
 */
exports.ClaimDailyCheckIn = async (cookie) => {
    return new Promise((resolve, reject) => {
        axios(OS_URL + "sign", {
            method: "POST",
            headers: {
                'cookie': cookie,
                'referer': `https://webstatic-sea.mihoyo.com/ys/event/signin-sea/index.html?act_id=${OS_ACT_ID}&lang=en-us`,
                'user-agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/83.0.4103.97 Safari/537.36',
            },
            params: {
                act_id: OS_ACT_ID,
            }
        })
        .then(({ data }) => {
            resolve(data)
        })
        .catch(reject)
    })
}


/**
 * Set your stats public or private.
 * @param {*} cookie
 * @param {*} access
 * @returns 
 */
exports.setVisibility = async(cookie, access) => {
    try {
        let data = false
        let attempt = 0
        let retry = function() {
            if (attempt > 3) {
                throw new Error("Error when trying to get data, please recheck your cookie token or uid!")
            }
            if (data.retcode === -10001) {
                console.log("Invalid request, retrying...")
                return attempt += 1
            }
        }
        do {
            console.log("Attempting to login...", "Attempt :", attempt)
            const { data: html } = await axios(OVERSEAS_URL + "game_record/card/wapi/publishGameRecord", {
                method: "POST",
                headers: {
                    'cookie': cookie,
                    'user-agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/83.0.4103.97 Safari/537.36',
                    'ds': this.GenerateDSToken(),
                    'x-rpc-app_version': '1.5.0',
                    'x-rpc-client_type': '4',
                    'x-rpc-language': 'en-us'
                },
                data: {
                    game_id: 2,
                    is_public: access
                }
            })
            data = html
        } while(retry())
        if (!data) return
        return data
    } catch (e) {
        throw e
    }
}

/**
 * Simpling the character data
 * @param {*} data 
 * @returns 
 */
 exports.simpleCharacterList = async(data) => {
    let list = data.data.avatars
    let result = []
    try {
        list.forEach(characters => {
            if (characters.rarity === 5) {
                let fivestr = `${characters.name} | ${characters.element} | Level ${characters.level} | Friendship Level ${characters.fetter} | C${characters.actived_constellation_num}`.trim()
                result.push(fivestr)
            }
            if (characters.rarity === 4) {
                let fourstr = `${characters.name} | ${characters.element} | Level ${characters.level} | Friendship Level ${characters.fetter} | C${characters.actived_constellation_num}`.trim()
                result.push(fourstr)
            }
        })
    } catch {
        console.log(data.message)
    }
    return result.join('\n')
}

/**
 * Simple spiral abyss info
 * @param {*} data 
 * @returns 
 */
exports.simpleSpiralAbyss = async(data) => {
    let res = data.data
    if (!res.max_floor) throw new Error("Data is not a spiral abyss info!")
    let str = `
Deepest Descent : ${res.max_floor}
Battles Fought : ${res.total_battle_times}
Win Total : ${res.total_win_times}

Most Defeats : ${res.defeat_rank[0].avatar_icon.split('UI_AvatarIcon_Side_')[1].split('.png')[0]}, ${res.defeat_rank[0].value}
Strongest Single Strike : ${res.damage_rank[0].avatar_icon.split('UI_AvatarIcon_Side_')[1].split('.png')[0]}, ${res.damage_rank[0].value}
Most Damage Taken : ${res.take_damage_rank[0].avatar_icon.split('UI_AvatarIcon_Side_')[1].split('.png')[0]}, ${res.take_damage_rank[0].value}
Elemental Bursts Unleashed : ${res.energy_skill_rank[0].avatar_icon.split('UI_AvatarIcon_Side_')[1].split('.png')[0]}, ${res.energy_skill_rank[0].value}
Elemental Skills Cast : ${res.normal_skill_rank[0].avatar_icon.split('UI_AvatarIcon_Side_')[1].split('.png')[0]}, ${res.normal_skill_rank[0].value}
        `.trim()
        return str
}

/**
 * Simple World Explorations info
 * @param {*} data 
 * @returns 
 */
exports.simpleWorldExplorations = async(data) => {
    let res = data.data.world_explorations
    let _list = []
    res.forEach(list => {
        let str = `${list.name} | Level ${list.level} | Progress ${Math.floor(list.exploration_percentage * 100 / 1000) + ' %'} | ${list.type}`
        _list.push(str)
    })
    return _list.join('\n')
}

/**
 * Simple user stats info
 * @param {*} data 
 * @returns 
 */
exports.simpleUserStats = async(data) => {
    let result = data.data.stats
    let str = `
${result.active_day_number} Days Active
${result.achievement_number} Achievements
${result.avatar_number} Characters
${result.way_point_number} Waypoint unlocked
${result.anemoculus_number} Anemoculus
${result.geoculus_number} Geoculus
${result.electroculus_number} Electroculus
${result.domain_number} Domain unlocked
${result.spiral_abyss} Spiral Abyss last floor
${result.luxurious_chest_number} Luxurious chest opened
${result.precious_chest_number} Precious chest opened
${result.exquisite_chest_number} Exquisite chest opened
${result.common_chest_number} Common chest opened
        `.trim()
        return str
}

/**
 * Simple home pot information
 * @param {*} data 
 * @returns 
 */
exports.simpleHomePot = async(data) => {
    let result = data.data.homes
    let _home = []
    result.forEach(home => {
        let str = `${home.name} | Level ${home.level} | ${home.visit_num} visited | ${home.comfort_num} adeptal energy | ${home.item_num} item placed`
        _home.push(str)
    })
    return _home.join('\n')
}
