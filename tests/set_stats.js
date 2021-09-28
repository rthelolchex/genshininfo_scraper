const gi = require('../lib/functions')
const cookie = '' // fill your cookie here, or create a config json, example on my repository.

async function setVisibility() {
    let request = true // true if you want visibled, or else make it false for making it's private.
    const data = await gi.setVisibility(cookie, request)
    console.log(data) // returns json with message ok
}

setVisibility()