const gi = require('../lib/functions')
const config = require('../config.json')
async function getCharacters(cookie, uid) {
    const data = await gi.GetUserProfile(cookie, uid)
    const result = await gi.simpleCharacterList(data)
    console.log(result) // returns Name | Element | Level | Friendship level | Constellation
}

getCharacters(config.COOKIE_TOKEN, config.UID) // for more easier make a config.json, example on my repository