// Get weather from external REST API and store it in a file
const { get_weather } = require('./openweather-adaptor')
const { write_file } = require('./file-adaptor')

// Secrets
const API_KEY = process.env['API_KEY'] || 'fail'

module.exports = {
  main: async function(context, weather_service = get_weather, file_service = write_file) {
    
    let city = getCity(context)
    console.log('getting weather for city', city)

    let data = await getData(city);
    if (data instanceof Error) {
      console.log("failed to read weather data", error);
      return data;
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
async function getData(city) {
  try {
    var data = await weather_service(city, API_KEY);
    console.log("weather data is: ", data);
    return data;
  } catch (error) {
    return error;
  }
}
function getCity(context) {
  let city = ''
  if (context && context?.city) {
    city = context.city
  } else {
    city = 'london'
  }
  return city
}

