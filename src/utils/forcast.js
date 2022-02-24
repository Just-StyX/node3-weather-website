import request from "request"
import chalk from "chalk"

export const forcast = (location, callback) => {
    const url = 'http://api.weatherstack.com/current?access_key=261d532cfbeb22c5c32fb1d7cabe4519&query='+encodeURIComponent(location)
    request({url, json: true}, (error, response) => {
        if (error) {
            callback('Unable to connect to weather station', undefined)
        } else if (response.body.error) {
            callback('Kindly provide accurate name of location', undefined)
        } else {
            const message = `${response.body.current.weather_descriptions} in ${location.toUpperCase()}. The current temperature is ${response.body.current.temperature} degrees. However, it feels like ${response.body.current.feelslike} degrees`
            callback(undefined, message)
        }
    })
}
