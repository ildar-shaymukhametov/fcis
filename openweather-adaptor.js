const axios = require('axios').default

const WEATHER_URL = 'https://api.openweathermap.org/data/2.5/weather?appid='
const SEPERATOR = '&q='

module.exports = {
  get_weather: async function(city, api_key) {
    try {
      const res = await axios.get(WEATHER_URL + api_key + SEPERATOR + city)
      return res
    } catch (err) {
      console.log('an error occurred getting the weather', err)
      return ('error')
    }
  }
}
