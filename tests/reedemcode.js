const config = require('../config.json')
const hoyolab = require('../lib/hoyolab')

async function ReedemCode(code) {
    const res = await hoyolab.ClaimReedemCode(config.COOKIE_TOKEN, config.UID, config.SERVER, code)
    console.log(res)
}

ReedemCode("GENSHINGIFT")