const hoyolab = require('../lib/hoyolab')
const { UID, COOKIE_TOKEN, SERVER, LANGUAGE, LANGUAGE_REASON, AUTH_TOKEN } = require('./config.json')


async function main() {
    let spiral_abyss = await hoyolab.spiralAbyss(COOKIE_TOKEN, SERVER, UID, '1')
    if (spiral_abyss) {
        // console.log(spiral_abyss)
        let data = spiral_abyss.data
        let str = `
== SPIRAL ABYSS STATS ==
Lantai tertinggi : ${data.max_floor}
Jumlah pertarungan : ${data.total_battle_times}
Total menang : ${data.total_win_times}

== ULASAN TANTANGAN ==
Mengalahkan terbanyak : ${data.defeat_rank[0].avatar_icon.split('UI_AvatarIcon_Side_')[1].split('.png')[0]}, ${data.defeat_rank[0].value}
Serangan terkuat : ${data.damage_rank[0].avatar_icon.split('UI_AvatarIcon_Side_')[1].split('.png')[0]}, ${data.damage_rank[0].value}
Menerima DMG terbanyak : ${data.take_damage_rank[0].avatar_icon.split('UI_AvatarIcon_Side_')[1].split('.png')[0]}, ${data.take_damage_rank[0].value}
Elemental burst dilancarkan : ${data.energy_skill_rank[0].avatar_icon.split('UI_AvatarIcon_Side_')[1].split('.png')[0]}, ${data.energy_skill_rank[0].value}
Elemental skill dikerahkan : ${data.normal_skill_rank[0].avatar_icon.split('UI_AvatarIcon_Side_')[1].split('.png')[0]}, ${data.normal_skill_rank[0].value}
== Powered by ExBot - Project by rthelolchex ==
        `.trim()
        console.log(str)
    }
}

main()
