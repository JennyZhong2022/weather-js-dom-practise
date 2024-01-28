const apikey = "5d50cb77a4d850371ce5a430e31c9b24";
const weatherDataElement = document.querySelector('#weather-data')
const cityInputElement = document.querySelector('#city-input')
const formElement = document.querySelector('form')


const getWeatherData = async(cityValue) => {
    const url = `https://api.openweathermap.org/data/2.5/weather?q=${cityValue}&appid=${apikey}&units=metric`
    
try{
    const response = await fetch(url)
    const data = await response.json()
    console.log(data);
    const temperature = Math.round(data.main.temp)
    const description = data.weather[0].description
    const icon = data.weather[0].icon
    const details = [
        `Feels like: ${Math.round(data.main.feels_like)}`,
        `Humidity: ${data.main.humidity}%`,
        `Wind speed: ${data.wind.speed} m/s`
    ]

    weatherDataElement.querySelector('.icon').innerHTML = `<img src="http://openweathermap.org/img/wn/${icon}.png" alt="weather icon" />`
    weatherDataElement.querySelector('.temperature').textContent=`${temperature}°C `

    weatherDataElement.querySelector('.description').textContent = description
    
    weatherDataElement.querySelector('.details').innerHTML = details.map(detail => `<div>
        ${detail}
    </div>`).join('')


}
catch (error) {
     console.log(error);
    }
}

formElement.addEventListener('submit', (e) => {
    e.preventDefault()
    const cityValue=cityInputElement.value
    getWeatherData(cityValue)
})