const gi = require('../lib/functions')
const config = require('../config.json')
async function getCharacters(cookie, uid) {
    const data = await gi.GetUserProfile(cookie, uid)
    if (data.data === null) return console.log(data.message)
    const chara = await gi.simpleCharacterList(data)
    const stats = await gi.simpleUserStats(data)
    const world = await gi.simpleWorldExplorations(data)
    console.log(chara + '\n\n' + stats + "\n\n" + world) // returns Name | Element | Level | Friendship level | Constellation
}

getCharacters(config.COOKIE_TOKEN, config.UID) // for more easier make a config.json, example on my repository