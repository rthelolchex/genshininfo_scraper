const hoyolab = require('./lib/hoyolab')
const daily = require('./lib/daily')
const transactions = require('./lib/transactions')
const gacha = require('./lib/gacha')
const fs = require('fs')
const { UID, COOKIE_TOKEN, SERVER, LANGUAGE, LANGUAGE_REASON, AUTH_TOKEN } = require('./config.json')


async function main() {
    const data = await gacha.getData(AUTH_TOKEN)
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
    let fiveStarChar = null;
    let lastCharacterEventWishes = characterEventWishes[characterEventWishes.length - 1];
    characterEventWishes.forEach(wish => {
            if (wish.rank === '5') {
                fiveStarChar = wish;
            }
        });
    let currentPityCharacterEvent = (lastCharacterEventWishes === fiveStarChar) ? 0 : lastCharacterEventWishes.pity;
    let weaponEventWishes = data[1];
    let fiveStarWeapon = null;
    let lastWeaponEventWishes = weaponEventWishes[weaponEventWishes.length - 1];
        weaponEventWishes.forEach(wish => {
            if (wish.rank === '5') {
                fiveStarWeapon = wish;
            }
            else fiveStarWeapon = {
                name: "none",
                pity: "0"
            }
        });
    let currentPityWeaponEvent = (lastWeaponEventWishes === fiveStarWeapon) ? 0 : lastWeaponEventWishes.pity;

    let permanentEventWishes = data[2];
    let fiveStarPermanent = null;
    let lastPermanentEventWishes = permanentEventWishes[permanentEventWishes.length - 1];
    permanentEventWishes.forEach(wish => {
        if (wish.rank === '5') {
                fiveStarPermanent = wish;
            }
        });
    let currentPityPermanentEvent = (lastPermanentEventWishes === fiveStarPermanent) ? 0 : lastPermanentEventWishes.pity;

    console.log("\n");
    console.log("======= GACHA DETAILS =======")
    console.log("\n");
    console.log('======= Event Permohonan Karakter =======');
    console.log('Anda mendapatkan 5-Star :', fiveStarChar.name, 'di pity', fiveStarChar.pity);
    console.log('Pity saat ini :', currentPityCharacterEvent);
    console.log('=========================================');
    console.log("\n");
    console.log('======= Event Permohonan Senjata ========');
    console.log('Anda mendapatkan 5-Star :', fiveStarWeapon.name, 'di pity', fiveStarWeapon.pity);
    console.log('Pity saat ini :', currentPityWeaponEvent);
    console.log('=========================================');
    console.log("\n");
    console.log('========== Permohonan Standar ===========');
    console.log('Anda mendapatkan 5-Star :', fiveStarPermanent.name, 'di pity', fiveStarPermanent.pity);
    console.log('Pity saat ini :', currentPityPermanentEvent);
    console.log('=========================================');
    console.log('\n')
    console.log('Powered by ExBot - Project by rthelolchex')
}
main()

// Belajar fungsi wkwk biar ga bolak balik mulu:/

// fungsi of kembalinya datanya
// fungsi in kembalinya angkanya
// fungsi length kembalinya total keseluruhan