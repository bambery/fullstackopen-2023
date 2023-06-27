import axios from 'axios'

const baseUrl = 'https://studies.cs.helsinki.fi/restcountries/api'

const getAll = () => {
    const request = axios.get(`${baseUrl}/all`)
    return request.then(response => response.data.map(country => country.name.common))
}

const getCountry = ( countryName ) => {
    const request = axios.get(`${baseUrl}/name/${countryName}`)
    return request.then(response => {
        const countryData = {
            name: response.data.name.common,
            capital: response.data.capital[0],
            area: response.data.area,
            languages: Object.values(response.data.languages),
            flag: response.data.flags.svg
        }
        return countryData
    })
}
export default {
    getAll, getCountry
}
