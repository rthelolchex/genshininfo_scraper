const axios = require('axios')
const reason = require('../reason.json')

const YSULOG_URL = 'https://hk4e-api-os.mihoyo.com/ysulog/api/'

/**
 * Get a reason code
 * @param {*} lang 
 * @returns 
 */
exports.getReason = async(lang) => {
    return new Promise((resolve, reject) => {
        axios.get(`https://mi18n-os.mihoyo.com/webstatic/admin/mi18n/hk4e_global/m02251421001311/m02251421001311-${lang}.json`, {
            headers: {
                'user-agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/83.0.4103.97 Safari/537.36',
            },
        })
        .then(({ data }) => {
            resolve(data)
        })
        .catch(reject)
    })
}

/**
 * Get primogem transactions from your account
 * @param {*} authkey 
 */
exports.getPrimogemTransactions = async(authkey, lang) => {
    const { data: html } = await axios.get(YSULOG_URL + "getPrimogemLog", {
        headers: {
            // recommended header
            "user-agent":"Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/58.0.3029.110 Safari/537.36"
        },
        params: {
            size: 20,
            authkey: authkey,
            lang: lang,
            end_id: 0
        }
    })
    return html
}

/**
 * Recognize reason from a code
 * @param {*} code 
 * @returns 
 */
exports.recognizeReason = async(code) => {
    if (reason[code]) {
        return reason[code]
    }
    else return `Invalid reason code!`
}