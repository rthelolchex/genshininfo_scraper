const config = require('../config.json')
const hoyolab = require('../lib/hoyolab')

async function main() {
    try {
        res = await hoyolab.GetUserProfile(config.COOKIE_TOKEN, config.UID)
    } catch (e) {
        console.log(e)
    } finally {
        let data = res.data.stats
        let str = `
Jumlah hari aktif : ${data.active_day_number}
Achievement tercapai : ${data.achievement_number}
Jumlah karakter diperoleh : ${data.avatar_number}
Aktivasi waypoint : ${data.way_point_number}
Anemoculus : ${data.anemoculus_number}
Geoculus : ${data.geoculus_number}
Electroculus : ${data.electroculus_number}
Domain terbuka : ${data.domain_number}
Spiral Abyss : ${data.spiral_abyss}
Luxurious chest terbuka : ${data.luxurious_chest_number}
Precious chest terbuka : ${data.precious_chest_number}
Exquisite chest terbuka : ${data.exquisite_chest_number}
Common chest terbuka : ${data.common_chest_number}
        `.trim()
        console.log(str)
    }
}

main()