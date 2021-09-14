const axios = require('axios')
const reason = require('../reason.json')

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