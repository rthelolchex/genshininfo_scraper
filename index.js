const hoyolab = require('./lib/hoyolab')
const daily = require('./lib/daily')
const { UID, COOKIE_TOKEN, SERVER } = require('./config.json')

async function main() {
    const reedemcode = await hoyolab.ClaimReedemCode(COOKIE_TOKEN, UID, SERVER, 'GENSHINGIFT')
    if (reedemcode) {
        let str = `
== REEDEM CODE ==

Result : ${reedemcode.message}

== Powered by ExBot - Project by rthelolchex ==
        `.trim()
        console.log(str)
    }
}

main()