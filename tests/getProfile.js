const hoyolab = require('../lib/hoyolab')
const config = require('../config.json')

async function main() {
    try {
        let data = false
        let attempt = 0
        let defaultCondition = function () {
            if (attempt > 3) {
                return console.log("Error logged in your account!, please recheck the cookie token or uid!")
            }
            if (data.data === null) {
                console.log(`Error when trying get your data, reason ${data.message}, retrying...`)
                return attempt += 1
            }
        }
        do {
            console.log("Attempting to login...", "Attempt :", attempt)
            data = await hoyolab.GetUserProfile(config.COOKIE_TOKEN, config.UID)
        } while (defaultCondition())
        console.log(data)
    } catch (e) {
        console.log(e)
    }
}
main()