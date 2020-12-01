const request = require('request')

const weather = (lat, long, city, callback) => {
  const url = `http://api.weatherstack.com/current?access_key=7f98aa49df9e2a724da4faf2e99166f2&query=${lat},${long}`

  request({ url, json: true }, (error, { body } = {}) => {
    if (error) {
      callback(Error('Unable to connect to weather service.'), undefined)
      return
    }
    if (body.error) {
      callback(Error(body.error), undefined)
      return
    }
    const { weather_descriptions: weatherDescriptions, temperature, feelslike, weather_icons: weatherIcons } = body.current
    callback(undefined, {
      forecast: `Weather condition in ${city} currently: ${weatherDescriptions[0].toLowerCase()}. It is ${temperature} C° outside, and feels like ${temperature === feelslike ? 'the same' : `${feelslike} C°`}.`,
      weatherIcon: weatherIcons[0],
      weatherDescription: weatherDescriptions[0],
      temperature,
      feelslike
    })
  })
}

module.exports = weather
