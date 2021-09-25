const hoyolab = require('../lib/hoyolab')
const prettier = require('../lib/prettier')
const config = require('../config.json')

async function main() {
    try {
        let data = false
        let attempt = 0
        let defaultCondition = function () {
            if (attempt > 3) {
                return console.log("Error logged in your account!, please recheck the cookie token or uid!")
            }
            if (data.retcode === 10001) {
                return console.log("Not logged in, please check your cookie token!")
            }
            if (data.retcode === -10001) {
                console.log(`Error when trying get your data, reason ${data.message}, retrying...`)
                return attempt += 1
            }
            if (data.retcode === 10102) {
                return console.log("Information user has been privated, can't capture the data!")
            }
        }
        do {
            console.log("Attempting to login...", "Attempt :", attempt)
            data = await hoyolab.GetUserProfile(config.COOKIE_TOKEN, config.UID)
        } while (defaultCondition())
        if (data.data === null) return
        const userStats = await prettier.userStats(data)
        const characterList = await prettier.characterList(data)
        const worldExplorations = await prettier.worldExplorations(data)
        const homePot = await prettier.homePot(data)
        console.log(userStats + '\n\n' + characterList + '\n\n' + worldExplorations + '\n\n' + homePot)
    } catch (e) {
        console.log(e)
    }
}

main()