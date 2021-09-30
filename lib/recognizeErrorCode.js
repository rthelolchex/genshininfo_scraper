/**
 * Recognize the retCode on mihoyo's api.
 * @param {*} Where 
 * @param {*} ErrorCode 
 * @returns 
 */
module.exports = (Where, ErrorCode) => {
    let retCode = {
        // General
        general: {
            10101: "Too many requests, please try again later!",
            "-100": "Not logged in, cookie token maybe not provided or incorrect",
            10001: "Not logged in, cookie token maybe not provided or incorrect",
            10102: "Data is not public for this user, please try again!",
            1009: "User not found, please recheck the uid!",
            "-10002": "Cannot get rewards info, maybe account has no game binded into it.",
            "-108": "Language invalid",
            10103: "Cookies are correct, but do not have hoyolab account bounded to them.",
        },

        // Redeem code
        redeemCode: {
            "-2003": "Invalid redeem code!",
            "-2017": "This code has been already in use",
            "-2001": "This code has been expired",
            "-2021": "Can't claim this code account with adventure rank lower than 10.",
            "-1073": "Can't claim this code, this account has no game account bound to it.",
            "-1071": "Not logged in, make sure cookie and uid is correct.",
        },

        // Daily check-in
        dailyCheckIn: {
            "-5003": "You've already claimed today, please return tomorrow!",
        },

        // Gacha history
        gachaHistory: {
            "-100": "Invalid authkey, make sure it's valid or logged in into your account.",
            "-101": "Authkey timeout, please update it by opening the gacha history again."
        },

        // Spiral Abyss
        spiralAbyss: {
            "-1": "Invalid schedule type, please try again!"
        },
    }
    return new Error(retCode[Where][ErrorCode])
}