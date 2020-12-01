const weatherForm = document.querySelector('#weather-form')

weatherForm.addEventListener('submit', (e) => {
  e.preventDefault()
  const location = e.target.elements.location.value
  const mainEl = document.querySelector('.forecasts-container')
  const containerEl = document.createElement('a')
  containerEl.classList = 'forecast-item'
  mainEl.prepend(containerEl)
  const loadingEl = document.createElement('div')
  loadingEl.textContent = `We just sent someone to check the weather around ${location}`
  const loadingInterval = setInterval(() => {
    loadingEl.textContent += '.'
  }, 200)
  loadingEl.setAttribute('style', 'padding-left: 8px')
  containerEl.append(loadingEl)

  window.fetch(`/weather?address=${location}`).then((response) => {
    response.json().then(({ error, weatherIcon, location, weatherDescription, temperature, feelslike } = {}) => {
      clearInterval(loadingInterval)
      containerEl.removeChild(loadingEl)
      if (error) {
        const errorEl = document.createElement('p')
        errorEl.textContent = error
        errorEl.setAttribute('style', 'padding-left: 8px')
        containerEl.append(errorEl)
        containerEl.classList += ' fail'
        return
      }
      containerEl.setAttribute('href', `https://www.google.com/maps/search/${encodeURIComponent(location)}`)
      containerEl.setAttribute('target', '_blank')
      const imageEl = document.createElement('img')
      imageEl.setAttribute('src', weatherIcon)
      imageEl.classList = 'weather-icon'
      containerEl.append(imageEl)
      const infosEl = document.createElement('p')
      infosEl.classList = 'weather-infos'
      containerEl.append(infosEl)
      const locationEl = document.createElement('p')
      locationEl.classList = 'location'
      const wordsOfLocation = location.split(' ')
      console.log(wordsOfLocation)
      locationEl.textContent = location
      infosEl.append(locationEl)
      const conditionEl = document.createElement('p')
      conditionEl.textContent = `Current condition: ${weatherDescription}`
      infosEl.append(conditionEl)
      const temperatureEl = document.createElement('p')
      temperatureEl.textContent = `It is ${temperature} C° outside, and feels like ${temperature === feelslike ? 'the same' : `${feelslike} C°`}.`
      infosEl.append(temperatureEl)
      containerEl.classList += ' success'
    })
  })
  e.target.elements.location.value = ''
})
