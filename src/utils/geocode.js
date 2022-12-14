const request = require('request')

const geocode = (address, callback) => {
    const url = 'https://api.mapbox.com/geocoding/v5/mapbox.places/' + encodeURIComponent(address) + '.json?access_token=pk.eyJ1IjoianVuZTIyMDYiLCJhIjoiY2w2b2k1Z3NnMDJnZDNqbjVkZHc0cnk3ayJ9.5cSF-lLBoFB7G0kBUeREtA&limit=1'

   request({url, json: true}, (error, {body}) => {
        if (error) {
            callback('check your connection!', undefined)
        }else if (body.features.length === 0) {
            callback('Please provide a much detailed address', undefined)
        } else {
            callback(undefined, {
             latitude:  body.features[0].center[1],
             longitude:  body.features[0].center[0],
            location: body.features[0].place_name 
            })
        }
    })
}
module.exports = geocode

