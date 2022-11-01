const request = require('request')


const forecast = (latitude, longitude, callback) => {
    const url = 'http://api.weatherstack.com/current?access_key=7bdd8b828946fb2dc553c8a70d2facd2&query=' 
    + latitude + ',' + longitude + '&units=f'

     request({ url, json: true}, (error, {body}) => {
        //error handling
        if (error) {
            callback('unable to connect to weather service', undefined);
        } else if (body.error) {
           callback('Unable to find location', undefined);
        } else {
            callback(undefined, `${body.current.weather_descriptions[0]}. It is currently ${body.current.temperature} It feels like ${body.current.feelslike} degrees out, with ${body.current.humidity} humidity`);
        }   
    })
}
module.exports = forecast