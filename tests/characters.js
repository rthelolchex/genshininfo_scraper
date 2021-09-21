const config = require('../config.json')
const hoyolab = require('../lib/hoyolab')

async function main() {
    const data = await hoyolab.getCharacters(config.COOKIE_TOKEN, config.UID, config.SERVER)
    let str = `
===========================================
★★★★★
${data.characters_name_FiveStar.join('\n')}

★★★★
${data.characters_name_FourStar.join('\n')}
===========================================`.trim()
    console.log(str)
}

main()