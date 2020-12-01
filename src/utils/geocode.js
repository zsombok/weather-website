const request = require('request')

const geocode = (address, callback) => {
  const url = `https://api.mapbox.com/geocoding/v5/mapbox.places/${encodeURIComponent(address)}.json?access_token=pk.eyJ1IjoienNvbWJva2RhdmlkIiwiYSI6ImNraTNrNTc5NTMyaWwyenA1YW9remlqcG8ifQ.h3CoBa8uqX1hXIAz_6t1fA&limit=1`

  request({ url, json: true }, (error, { body } = {}) => {
    if (error) {
      callback(Error('Unable to connect to location service.'), undefined)
      return
    }
    if (body.features.length === 0) {
      callback(Error(`"${address}" not found. Provide another location to search for!`), undefined)
      return
    }
    if (body.message) {
      callback(Error(`Error: ${body.message}`), undefined)
      return
    }
    const { center, place_name: location } = body.features[0]
    callback(undefined, {
      lat: center[1],
      long: center[0],
      location
    })
  })
}

module.exports = geocode
