// Get weather from external REST API and store it in a file
const fs = require('fs')
const { get_weather } = require('./openweather-adaptor')

const API_KEY = process.env['API_KEY'] || 'fail'

module.exports = {
  main: async function(context, weather_service = get_weather) {
    let city = ''
    if (context && context?.city) {
      city = context.city
    } else {
      city = 'london'
    }

    console.log('getting weather for city', city)
    const data = await weather_service(city, API_KEY)

    console.log('weather data is: ', data)
    let today = new Date()
    today = today.toISOString().slice(0,10)
    fs.writeFileSync('weather-' + today + '.json', JSON.stringify(data))
    console.log('wrote weather for', city)
    return (city)
  }
}
