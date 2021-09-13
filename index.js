const hoyolab = require('./lib/hoyolab')
const daily = require('./lib/daily')
const { UID, COOKIE_TOKEN, SERVER } = require('./config.json')

async function main() {
    const ListClaimed = await daily.getClaimedRewards(COOKIE_TOKEN)
    if (ListClaimed) {
        let list = ListClaimed.data.list
        let rewards_list = []
        for (let rewards of list) {
            let str = `${rewards.cnt} ${rewards.name}`
            console.log(str)
        }
    }
}

main()