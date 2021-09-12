const axios = require('axios')

// Links of the daily check in and the act_id from the server
const OS_URL = 'https://hk4e-api-os.mihoyo.com/event/sol/'
const OS_ACT_ID = 'e202102251931481'

/**
 * Get daily reward information from your account
 * @param {*} cookie 
 * @returns
 */

exports.getDailyRewardInfo = async (cookie) => {
    return new Promise((resolve, reject) => {
        axios.get(OS_URL + "info", {
            headers: {
                'cookie': cookie,
                'user-agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/83.0.4103.97 Safari/537.36',
            },
            params: {
                act_id: OS_ACT_ID,
            }
        })
        .then(({ data }) => {
            resolve(data)
        })
        .catch(reject)
    })
}


/**
 * Get list claimed daily check-in on your account
 * @param {*} cookie 
 * @returns 
 */
exports.getClaimedRewards = async (cookie) => {
    return new Promise((resolve, reject) => {
        axios.get(OS_URL + "award", {
            headers: {
                'cookie': cookie,
                'user-agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/83.0.4103.97 Safari/537.36',
            },
            params: {
                act_id: OS_ACT_ID,
                current_page: 1
            }
        })
        .then(({ data }) => {
            resolve(data)
        })
        .catch(reject)
    })
}

/**
 * Claim your daily check-in
 * @param {*} cookie 
 * @returns
 */
exports.ClaimDailyCheckIn = async (cookie) => {
    return new Promise((resolve, reject) => {
        axios(OS_URL + "sign", {
            method: "POST",
            headers: {
                'cookie': cookie,
                'referer': `https://webstatic-sea.mihoyo.com/ys/event/signin-sea/index.html?act_id=${OS_ACT_ID}&lang=en-us`,
                'user-agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/83.0.4103.97 Safari/537.36',
            },
            params: {
                act_id: OS_ACT_ID,
            }
        })
        .then(({ data }) => {
            resolve(data)
        })
        .catch(reject)
    })
}