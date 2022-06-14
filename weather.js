// Get weather from external REST API and store it in a file
const fs = require('fs')
const { get_weather } = require('./openweather-adaptor')

const API_KEY = process.env['API_KEY'] || 'fail'

module.exports = {
  main: async function(context) {
    let city = ''
    if (context && context?.city) {
      city = context.city
    } else {
      city = 'london'
    }

    console.log('getting weather for city', city)
    const res = await get_weather(city, API_KEY)

    if (res.status === 200) {
      console.log('weather data is: ', res.data)
      let today = new Date()
      today = today.toISOString().slice(0,10)
      fs.writeFileSync('weather-' + today + '.json', JSON.stringify(res.data))
      console.log('wrote weather for', city)
      return (city)
    } else {
      console.log('error occurred, status =', res.status)
      return ('error')
    }
  }
}
