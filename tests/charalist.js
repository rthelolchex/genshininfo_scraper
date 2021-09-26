const gi = require("../lib/functions")
const config = require('../config.json')

async function getCharacters(cookie, uid) {
    const data = await gi.GetUserProfile(cookie, uid)
    if (!data) return
    const result = await gi.simpleUserStats(data)
    console.log(result)
}

getCharacters(config.COOKIE_TOKEN, config.UID) // fill your cookie and uid here or make a config.json, example on my repository