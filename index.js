const hoyolab = require('./lib/hoyolab')
const daily = require('./lib/daily')
const transactions = require('./lib/transactions')
const fs = require('fs')
const { UID, COOKIE_TOKEN, SERVER, LANGUAGE, LANGUAGE_REASON, AUTH_TOKEN } = require('./config.json')


async function main() {
    let code = '10241278934'
    let reason = await transactions.recognizeReason(code)
    console.log(reason)
}

main()
