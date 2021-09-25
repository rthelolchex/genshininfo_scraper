
exports.characterList = async(data) => {
    let list = data.data.avatars
    let result = []
    try {
        list.forEach(characters => {
            if (characters.rarity === 5) {
                let fivestr = `${characters.name} | ${characters.element} | Level ${characters.level} | Friendship Level ${characters.fetter} | C${characters.actived_constellation_num}`.trim()
                result.push(fivestr)
            }
            if (characters.rarity === 4) {
                let fourstr = `${characters.name} | ${characters.element} | Level ${characters.level} | Friendship Level ${characters.fetter} | C${characters.actived_constellation_num}`.trim()
                result.push(fourstr)
            }
        })
    } catch {
        console.log(data.message)
    }
    return result.join('\n')
}

exports.spiralAbyss = async(data) => {
    let res = data.data
    let str = `
Lantai tertinggi : ${res.max_floor}
Jumlah pertarungan : ${res.total_battle_times}
Total menang : ${res.total_win_times}

Mengalahkan terbanyak : ${res.defeat_rank[0].avatar_icon.split('UI_AvatarIcon_Side_')[1].split('.png')[0]}, ${res.defeat_rank[0].value}
Serangan terkuat : ${res.damage_rank[0].avatar_icon.split('UI_AvatarIcon_Side_')[1].split('.png')[0]}, ${res.damage_rank[0].value}
Menerima DMG terbanyak : ${res.take_damage_rank[0].avatar_icon.split('UI_AvatarIcon_Side_')[1].split('.png')[0]}, ${res.take_damage_rank[0].value}
Elemental burst dilancarkan : ${res.energy_skill_rank[0].avatar_icon.split('UI_AvatarIcon_Side_')[1].split('.png')[0]}, ${res.energy_skill_rank[0].value}
Elemental skill dikerahkan : ${res.normal_skill_rank[0].avatar_icon.split('UI_AvatarIcon_Side_')[1].split('.png')[0]}, ${res.normal_skill_rank[0].value}
        `.trim()
        return str
}

exports.worldExplorations = async(data) => {
    let res = data.data.world_explorations
    let _list = []
    res.forEach(list => {
        let str = `${list.name} | Level ${list.level} | Progress ${Math.floor(list.exploration_percentage * 100 / 1000) + ' %'} | ${list.type}`
        _list.push(str)
    })
    return _list.join('\n')
}

exports.userStats = async(data) => {
    let result = data.data.stats
    let str = `
${result.active_day_number} Days Active | ${result.achievement_number} Achievements
${result.avatar_number} Characters | ${result.way_point_number} Waypoint unlocked
${result.anemoculus_number} Anemoculus | ${result.geoculus_number} Geoculus
${result.electroculus_number} Electroculus | ${result.domain_number} Domain unlocked
${result.spiral_abyss} Spiral Abyss last floor | ${result.luxurious_chest_number} Luxurious chest opened
${result.precious_chest_number} Precious chest unlocked | ${result.exquisite_chest_number} Exquisite chest opened
${result.common_chest_number} Common chest unlocked
        `.trim()
        return str
}

exports.homePot = async(data) => {
    let result = data.data.homes
    let _home = []
    result.forEach(home => {
        let str = `${home.name} | Level ${home.level} | ${home.visit_num} visited | ${home.comfort_num} adeptal energy | ${home.item_num} item placed`
        _home.push(str)
    })
    return _home.join('\n')
}
