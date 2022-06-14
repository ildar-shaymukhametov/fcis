// Get weather from external REST API and store it in a file
const { get_weather } = require('./openweather-adaptor')
const { write_file } = require('./file-adaptor')

// Secrets
const API_KEY = process.env['API_KEY'] || 'fail'

module.exports = {
  main: async function(context,
                       weather_service = get_weather,
                       file_service = write_file) {
    let city = ''
    let data = {}
    
    if (context && context?.city) {
      city = context.city
    } else {
      city = 'london'
    }

    console.log('getting weather for city', city)
    try {
      data = await weather_service(city, API_KEY)
      console.log('weather data is: ', data)
    } catch (error) {
      console.log('failed to read weather data', error)
      return (error)
    }

    let today = new Date()
    today = today.toISOString().slice(0,10)
    const filename = 'weather-' + today + '.json'

    const result = file_service(filename, data)
    if (result.status == 'success') {
      console.log('wrote file', result.file_written)
    } else {
      console.log('error writing file', result.error)
    }

    return (city)
  }
}
