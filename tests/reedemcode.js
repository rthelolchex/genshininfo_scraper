const config = require('../config.json')
const gi = require('../lib/functions')

async function ReedemCode(cookie, uid, code) {
    const res = await gi.ClaimReedemCode(cookie, uid, code)
    console.log(res) // returns result of json
}

ReedemCode(config.COOKIE_TOKEN, config.UID, "GENSHINGIFT")