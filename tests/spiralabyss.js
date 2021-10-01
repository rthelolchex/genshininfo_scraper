const gi = require('../lib/functions')
const { UID, COOKIE_TOKEN, SERVER, LANGUAGE, LANGUAGE_REASON, AUTH_TOKEN } = require('../config.json')


async function main() {
    let data = await gi.spiralAbyss(COOKIE_TOKEN, UID, 1)
    let result = await gi.simpleSpiralAbyss(data)
    console.log(result)
}

main()
