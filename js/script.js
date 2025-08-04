// variables con la api y su API key
//  ?q={city name}&appid={API key}   formato del  query que hace la API
const urlApi = `https://api.openweathermap.org/data/2.5/weather`
const API_KEY = 'API-KEY'

// variable de diferencia de K° a C°
const diffKelvin = 273.15

// acción sobre el botón 'search button'
document.getElementById('searchButton').addEventListener('click', () =>{
    const city = document.getElementById('cityInput').value  // variable con el input de la ciudad
    if(city){
        fetchWeather(city) // uso de la API y la información del clima
    }else{
        alert('Please choose a valid City')
    }
})

// llamar datos del clima + query de la API
function fetchWeather(city){
    fetch(`${urlApi}?q=${city}&appid=${API_KEY}`)
    .then(data => data.json())
    // .then(data => console.log(data))  para mostrar en consola
    .then(data => showWeather(data))
}

// manejo del json y la data, mediante Postman
function showWeather(data){
    const responseData = document.getElementById('responseData')
    responseData.innerHTML = ''

    const cityName = data.name
    const countryName = data.sys.country
    const temp = data.main.temp
    const humidity = data.main.humidity
    const description = data.weather[0].description
    const iconWeather = data.weather[0].icon

    const cityInfo = document.createElement('h2')
    cityInfo.textContent = `${cityName}, ${countryName}`

    const tempInfo = document.createElement('p')
    tempInfo.textContent = `The temperature is: ${Math.floor(temp-diffKelvin)}°C`

    const humidityInfo = document.createElement('p')
    humidityInfo.textContent = `The humidity is: ${humidity}`

    const showIcon = document.createElement('img')
    showIcon.src = `https://openweathermap.org/img/wn/${iconWeather}@2x.png`

    const showDescription = document.createElement('p')
    showDescription.textContent = `The weather information is: ${description}`

    responseData.appendChild(cityInfo)
    responseData.appendChild(tempInfo)
    responseData.appendChild(humidityInfo)
    responseData.appendChild(showIcon)
    responseData.appendChild(showDescription)
}
