# genshininfo_scraper

A Genshin Impact Information on your account

## Installation

Use the npm package manager to install this module.

```bash
npm install @rthelolchex/genshininfo_scraper
```
Or
```bash
npm install github:rthelolchex/genshininfo_scraper
```
## Cookie token
Please goto [this link](https://takagg.com/lisa-cookie) for getting the cookie token, thanks to TakaGG for this method, subscribe him on youtube!

## Usage

## Profile Data
Get your character list
```javascript
const gi = require('@rthelolchex/genshininfo_scraper')
const cookie = '' // fill your cookie here
const uid = '' // fill your uid here

async function getCharacters(cookie, uid) {
    const data = await gi.GetUserProfile(cookie, uid)
    if (!data) return
    const result = await gi.simpleCharacterList(data)
    console.log(result) // returns Name | Element | Level | Friendship level | Constellation
}

getCharacters(cookie, uid) // for more easier make a config.json, example on my repository
```

Get your user stats

```javascript
const gi = require('@rthelolchex/genshininfo_scraper')
const cookie = '' // fill your cookie here
const uid = '' // fill your uid here

async function getUserStats(cookie, uid) {
    const data = await gi.GetUserProfile(cookie, uid)
    if (!data) return
    const result = await gi.simpleUserStats(data)
    console.log(result) // returns xx Days Active, xx Achievements, xx Characters, etc..
}

getUserStats(cookie, uid) // for more easier make a config.json, example on my repository
```

Get your home pot stats

```javascript
const gi = require('@rthelolchex/genshininfo_scraper')
const cookie = '' // fill your cookie here
const uid = '' // fill your uid here

async function getHomePot(cookie, uid) {
    const data = await gi.GetUserProfile(cookie, uid)
    if (!data) return
    const result = await gi.simpleHomePot(data)
    console.log(result) // returns Name | Level | xx Visited | xx Adeptal Energy || xx Item Placed
}

getHomePot(cookie, uid) // for more easier make a config.json, example on my repository
```

Get your world explorations

```javascript
const gi = require('@rthelolchex/genshininfo_scraper')
const cookie = '' // fill your cookie here
const uid = '' // fill your uid here

async function getWorldExplorations(cookie, uid) {
    const data = await gi.GetUserProfile(cookie, uid)
    if (!data) return
    const result = await gi.simpleWorldExplorations(data)
    console.log(result) // returns Name city | Level | Progress | Type
}

getWorldExplorations(cookie, uid) // for more easier make a config.json, example on my repository
```

Get your spiral abyss info (still under building for automatic add schedule lol)

```javascript
const gi = require('@rthelolchex/genshininfo_scraper')
const cookie = '' // fill your cookie here
const uid = '' // fill your uid here

async function getSpiralAbyss(cookie, uid, schedule) {
    const data = await gi.spiralAbyss(cookie, uid, schedule)
    if (!data) return
    const result = await gi.simpleSpiralAbyss(data)
    console.log(result) // returns Deepest Descent, Battle Foughts, Win total, etc..
}

getWorldExplorations(cookie, uid) // for more easier make a config.json, example on my repository
```

## Daily Check-In and redeem code

Claim Daily check-in
```javascript
const gi = require('@rthelolchex/genshininfo_scraper')
const cookie = '' // fill your cookie here

async function ClaimDailyCheckIn(cookie) {
    const res = await gi.ClaimDailyCheckIn(cookie)
    console.log(res) // returns result of json
}

ClaimDailyCheckIn(cookie) // for more easier make a config.json, example on my repository
```

Claim reedem code
```javascript
const gi = require('@rthelolchex/genshininfo_scraper')
const cookie = '' // fill your cookie here
const uid = '' // fill your uid here

async function ReedemCode(cookie, uid, code) {
    const res = await gi.ClaimReedemCode(cookie, uid, code)
    console.log(res) // returns result of json
}

ReedemCode(cookie, uid, "GENSHINGIFT") // for more easier make a config.json, example on my repository
```
## Privacy

Set visibility of your progress on your genshin data.

```javascript
const gi = require('@rthelolchex/genshininfo_scraper')
const cookie = '' // fill your cookie here, or create a config json, example on my repository.

async function setVisibility() {
    let request = true // true if you want visibled, or else make it false for making it's private.
    const data = await gi.setVisibility(cookie, request)
    console.log(data) // returns json with message ok
}

setVisibility()
```
