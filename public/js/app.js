const weatherForm = document.querySelector('#weather-form')

weatherForm.addEventListener('submit', (e) => {
  e.preventDefault()
  const location = e.target.elements.location.value
  const mainEl = document.querySelector('.forecasts-container')
  const containerEl = document.createElement('div')
  containerEl.classList = 'forecast-item'
  mainEl.prepend(containerEl)
  const loadingEl = document.createElement('div')
  loadingEl.textContent = `Loading weather info for ${location}`
  const loadingInterval = setInterval(() => {
    loadingEl.textContent += '.'
  }, 200)
  loadingEl.setAttribute('style', 'padding-left: 8px')
  containerEl.append(loadingEl)

  window.fetch(`http://localhost:3000/weather?address=${location}`).then((response) => {
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
      containerEl.classList += ' success'
      const imageEl = document.createElement('img')
      imageEl.setAttribute('src', weatherIcon)
      imageEl.classList = 'weather-icon'
      containerEl.append(imageEl)
      const infosEl = document.createElement('p')
      infosEl.classList = 'weather-infos'
      containerEl.append(infosEl)
      const cityEl = document.createElement('p')
      cityEl.classList = 'city'
      cityEl.textContent = location
      infosEl.append(cityEl)
      const conditionEl = document.createElement('p')
      conditionEl.textContent = `Current condition: ${weatherDescription}`
      infosEl.append(conditionEl)
      const temperatureEl = document.createElement('p')
      temperatureEl.textContent = `It is ${temperature} C° outside, and feels like ${temperature === feelslike ? 'the same' : `${feelslike} C°`}.`
      infosEl.append(temperatureEl)
    })
  })
  e.target.elements.location.value = ''
})
