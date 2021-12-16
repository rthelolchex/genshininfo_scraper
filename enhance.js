const axios = require('axios')
const gi = require('./lib/functions')
const charaid = require('./characterid.json')
const Readline = require('readline')
const rl = Readline.createInterface({
    input: process.stdin,
    output: process.stdout
})

/**
 * Get talent list for your character
 * @param {*} charactername 
 * @returns 
 */
async function getTalentList(charactername) {
    charactername = charactername.toLowerCase()
    const { data: html } = await axios.get('https://sg-public-api.mihoyo.com/event/calculateos/avatar/skill_list', {
        headers: {
            "cookie": "",
            "user-agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/83.0.4103.97 Safari/537.36",
        },
        params: {
            avatar_id: charaid[charactername].id,
            element_attr_id: charaid[charactername].elementid,
            lang: 'en-us'
        }
    })
    let data = html.data
    let list = []
    for (let list_skill of data.list) {
        list.push({
            id: list_skill.group_id,
            level_current: 1,
            level_target: list_skill.max_level
        })
    }
    return list
}

/**
 * Get enhancement for your character
 * @param {*} character 
 */
async function getEnhancementCharacter(character) {
    let talentList = await getTalentList(character)
    const { data: html } = await axios('https://sg-public-api.mihoyo.com/event/calculateos/compute', {
        method: "POST",
        headers: {
            "cookie": "",
            "user-agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/83.0.4103.97 Safari/537.36",
            "ds": gi.GenerateDSToken(),
            'x-rpc-app_version': '1.5.0',
            'x-rpc-client_type': '4',
            'x-rpc-language': 'en-us'
        },
        data: {
            "avatar_id": charaid[character].id,
            "avatar_level_current": 1,
            "avatar_level_target": 90,
            "element_attr_id": charaid[character].elementid,
            "skill_list": talentList,
            "weapon": {},
            "reliquary_list": [],
            "lang": "en-us"
          }
    })
    let data = html.data
    let character_consume = []
    let talent_consume = []
    let _character_consume = data.avatar_consume
    let _talent_consume = data.avatar_skill_consume
    for (let chara of _character_consume) {
        character_consume.push(`x${chara.num} ${chara.name}`)
    }
    for (let talent of _talent_consume) {
        talent_consume.push(`x${talent.num} ${talent.name}`)
    }
    console.log(`Character Name : ${character.replace(/^./, v => v.toUpperCase())}\n\nCharacter Level Up Requirements\n\n${character_consume.join('\n')}\n\nTalent Level Up Requirements\n\n${talent_consume.join('\n')}`)
}

let rlAnswer = null
function rlQuestion() {
    rl.question("Hey Traveler, selamat datang di script kami!\nDi script ini, kamu bisa mencari item ascend atau talenta yang dibutuhkan untuk karakter kamu\nSilahkan ketik nama karaktermu dibawah, jangan sembarangan ya aowkaok\n\nNama character : ", function(name) {
        if (!name || name && !charaid[name]) {
            console.clear()
            console.log("Nama karakter tidak valid, silahkan coba lagi.\n\n")
            return rlQuestion()
        }
        rlAnswer = name
        rl.close()
    })
}
rlQuestion()

rl.on('close', function() {
    if (!rlAnswer) {
        console.log("\n\nProses dibatalkan.")
        process.exit(0)
    }
    console.log("\n\nSilahkan tunggu sebentar, mendapatkan info dari server mihoyo...")
    getEnhancementCharacter(rlAnswer)
})
