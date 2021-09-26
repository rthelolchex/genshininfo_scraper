const gi = require('../lib/functions')
const { UID, COOKIE_TOKEN, SERVER, LANGUAGE, LANGUAGE_REASON, AUTH_TOKEN } = require('../config.json')


async function main() {
    const data = await gi.getWishHistory(AUTH_TOKEN)
    for (let x = 0; x < data.length; x++) {
        const element = data[x];

        let pity = 0;
        for (let index = 0; index < element.length; index++) {
            const item = element[index];
            pity += 1;
            item.pity = pity;
            if (item.rank == "5") {
                pity = 0;
            }
        }
    }
    let characterEventWishes = data[0];
    let fiveStarChar = [];
    let fiveStarCharPity = null
    let lastCharacterEventWishes = characterEventWishes[characterEventWishes.length - 1];
    characterEventWishes.forEach(wish => {
            if (wish.rank === '5') {
                let wish_str = `Anda mendapatkan 5-star : ${wish.name} di pity ${wish.pity}`.trim()
                fiveStarChar.push(wish_str)
                fiveStarCharPity = wish
            }
        });
    let currentPityCharacterEvent = (lastCharacterEventWishes === fiveStarCharPity) ? 0 : lastCharacterEventWishes.pity;
    let weaponEventWishes = data[1];
    let fiveStarWeapon = [];
    let fiveStarWeaponPity = null
    let lastWeaponEventWishes = weaponEventWishes[weaponEventWishes.length - 1];
        weaponEventWishes.forEach(wish => {
            if (wish.rank === '5') {
                let wishweapon_str = `Anda mendapatkan 5-star : ${wish.name} di pity ${wish.pity}`.trim()
                fiveStarWeapon.push(wishweapon_str)
                fiveStarWeaponPity = wish;
            }
            else fiveStarWeapon = [{
                name: "none",
                pity: "0"
            }]
        });
    let currentPityWeaponEvent = (lastWeaponEventWishes === fiveStarWeaponPity) ? 0 : lastWeaponEventWishes.pity;

    let permanentEventWishes = data[2];
    let fiveStarPermanent = [];
    let fiveStarPermanentPity = null
    let lastPermanentEventWishes = permanentEventWishes[permanentEventWishes.length - 1];
    permanentEventWishes.forEach(wish => {
        if (wish.rank === '5') {
            let wishpermanent_str = `Anda mendapatkan 5-star : ${wish.name} di pity ${wish.pity}`.trim()
            fiveStarPermanent.push(wishpermanent_str)
            fiveStarPermanentPity = wish;
            }
        });
    let currentPityPermanentEvent = (lastPermanentEventWishes === fiveStarPermanentPity) ? 0 : lastPermanentEventWishes.pity;

    console.log("\n");
    console.log("======= GACHA DETAILS =======")
    console.log("");
    console.log('======= Character Event Wish =======');
    console.log(fiveStarChar.join('\n'))
    console.log('Pity saat ini :', currentPityCharacterEvent);
    console.log('=========================================');
    console.log("");
    console.log('======= Weapon Event Wish ========');
    console.log(fiveStarWeapon.join('\n'));
    console.log('Pity saat ini :', currentPityWeaponEvent);
    console.log('=========================================');
    console.log("");
    console.log('========== Standard Wish ===========');
    console.log(fiveStarPermanent.join('\n'));
    console.log('Pity saat ini :', currentPityPermanentEvent);
    console.log('=========================================');
    console.log('')
    console.log('Powered by ExBot - Project by rthelolchex')
}
main()
