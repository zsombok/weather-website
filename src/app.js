const path = require('path')
const express = require('express')
const hbs = require('hbs')
const geocode = require('./utils/geocode')
const weather = require('./utils/weather')

const app = express()

const port = process.env.PORT || 3000
// Define paths for Express config
const publicFolderPath = path.join(__dirname, '../public')
const viewsPath = path.join(__dirname, '../templates/views')
const partialsPath = path.join(__dirname, '../templates/partials')

// Setup Handlebar engine and views directory
app.set('view engine', 'hbs')
app.set('views', viewsPath)
hbs.registerPartials(partialsPath)

// Setup static directory to serve
app.use(express.static(publicFolderPath))

app.get('', (req, res) => {
  res.render('index', {
    title: 'Weather App',
    name: 'Dávid Zsombok',
    theme: 'light' // light or dark
  })
})

app.get('/about', (req, res) => {
  res.render('about', {
    title: 'About',
    name: 'Dávid Zsombok',
    yearOfBirth: 1992
  })
})

app.get('/help', (req, res) => {
  res.render('help', {
    title: 'Help',
    name: 'Dávid Zsombok',
    message: 'How can I help you?'
  })
})

app.get('/weather', (req, res) => {
  if (!req.query.address) {
    res.send({
      error: 'You must provide a location to search!'
    })
    return
  }
  geocode(req.query.address, (error, { lat, long, location } = {}) => {
    if (error) return res.send({ error: error.toString() })
    weather(lat, long, location, (error, { forecast, weatherDescription, temperature, feelslike, weatherIcon } = {}) => {
      if (error) return res.send({ error: error.toString() })
      res.send({
        forecast,
        location,
        weatherDescription,
        temperature,
        feelslike,
        weatherIcon,
        address: req.query.address
      })
    })
  })
})

app.get('/help/*', (req, res) => {
  res.render('404', {
    title: '404',
    name: 'Dávid Zsombok',
    errorMessage: '404 - help article NOT found'
  })
})

app.get('*', (req, res) => {
  res.render('404', {
    title: '404',
    name: 'Dávid Zsombok',
    errorMessage: '404 - page NOT found'
  })
})

app.listen(port, () => {
  console.log(`Server is up and running on port ${port}.`)
})
