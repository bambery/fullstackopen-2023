import axios from 'axios'

const baseUrl = 'https://api.openweathermap.org/data/2.5/weather?'

const apiKey = process.env.REACT_APP_API_KEY

const getWeather = (lat, lon) => {
    const request = axios.get(`${baseUrl}lat=${lat}&lon=${lon}&appid=${apiKey}&units=metric`)
    return request.then(response => ({
        temp: response.data.main.temp,
        wind: response.data.wind.speed,
        icon: response.data.weather[0].icon
    }))
}

export default { getWeather }
