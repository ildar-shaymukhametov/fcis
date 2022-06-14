const axios = require('axios').default

const WEATHER_URL = 'https://api.openweathermap.org/data/2.5/weather?appid='
const SEPERATOR = '&q='

module.exports = {
  get_weather: async function(city, api_key) {
    try {
      const res = await axios.get(WEATHER_URL + api_key + SEPERATOR + city)
      if (res.status === 200) {
        return Promise.resolve(res.data)
      } else {
        return Promise.reject(res)
      }
    } catch (err) {
      console.log('an error occurred getting the weather', err)
      return ('error')
    }
  }
}
