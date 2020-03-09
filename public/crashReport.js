const request = require('request')


function reportToServer(url, payload) {
    console.log("payload===>", payload);
    return request.post(url, {
        json: payload
    }, (error, res, body) => {
        if (error) {
            console.error(error)
            return
        }
        console.log(`statusCode: ${res.statusCode}`)
        console.log(body)
    })
}
module.exports = {
    reportToServer
}