const fs = require('fs')
const {is, testRunner} = require('@gowerstreet/infintestimal')
const assert = require('assert')

const sut = require('./weather').main
const expected = ""
const today = new Date()
const date_today = today.toISOString().slice(0,10)
console.log('todays date is', date_today)
const filename = './weather-' + date_today + '.json'

// Stubs
async function weather_stub() {
  return Promise.resolve({
    name: 'London',
    weather: [
      { main: 'Clouds' }
    ]
  })
}

var file_stub_called = 0
var file_contents = {}
var file_name = ''

function file_stub(filename, data) {
  file_stub_called = file_stub_called + 1
  file_contents = data
  file_name = filename
  return({ status: 'success', file_written: filename })
}

// Setup
function delete_existing_weather_file() {
  if (fs.existsSync(filename)) {
    console.log('removing data file')
    fs.rmSync(filename)
  } else {
    console.log('no data file to remove')
  }
}

// Tests
async function test_weather_writes_file() {
  await sut({ city: 'london'}, weather_stub, file_stub)
  assert.ok(file_stub_called > 0, 'file not written')
}

function test_weather_file_contains_weather_data() {
  let data = file_contents
  assert.ok(data?.name == 'London', 'data should be for the city of London')
  assert.ok(data?.weather.length > 0, 'weather should return results')
  assert.ok(data?.weather[0]?.main == 'Clouds', 'London is always cloudy')
}

async function run_tests() {
  // setup
  delete_existing_weather_file()

  // actual tests
  await test_weather_writes_file()
  test_weather_file_contains_weather_data()
}

run_tests()
