const hoyolab = require('./lib/hoyolab')
const daily = require('./lib/daily')
const transactions = require('./lib/transactions')
const gacha = require('./lib/gacha')
const fs = require('fs')
const { UID, COOKIE_TOKEN, SERVER, LANGUAGE, LANGUAGE_REASON, AUTH_TOKEN } = require('./config.json')


async function main() {
    let history = await gacha.getWishHistory('1234')
    console.log(history)
}

main()
