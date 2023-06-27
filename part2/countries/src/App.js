import countryService from './services/countries'
import weatherService from './services/weather'

import { useState, useEffect } from 'react'

const CountryDetail = ({ countryData }) => {
    return(
        <div>
            <h1>{countryData.name}</h1>
            <div>
                <div>Capital: {countryData.capital?.name}</div>
                <div>Area: {countryData.area}</div>
            </div>
            <div>
                <h2>languages</h2>
                <ul>
                    {countryData.languages?.map(lang => <li key={lang}>{lang}</li>)}
                </ul>
            </div>
            <img className='flag' alt={`flag of ${countryData.name}.`} src={countryData.flag} />
            <div>
                <h2>Weather in {countryData.capital?.name}</h2>
                <div>
                    <div>Temperature: {countryData.capital?.temp} Celcius</div>
                    <img alt='icon for current weather' src={`https://openweathermap.org/img/wn/${countryData.capital?.weatherIcon}@2x.png`} />
                    <div>Wind: {countryData.capital?.wind} m/s</div>
                </div>
            </div>
        </div>
    )
}

const CountryList = ({ countries, getCountryData }) => {
    if(countries.length > 10){
        return(<div>Too many matches, specify another filter</div>)
    } else {
        return(
            <ul>
                {countries.map( countryName =>
                    <li key={countryName}>
                        {countryName}
                        <button onClick={() => getCountryData(countryName)}>show</button>
                    </li>
                )}
            </ul>
        )
    }
}

function App() {
    const [search, setSearch] = useState('')
    const [countries, setCountries] = useState([])
    const [countryDisplayData, setCountryDisplayData] = useState(null)
    const [matchingCountries, setMatchingCountries] = useState([])

    useEffect(() => {
        countryService
            .getAll()
            .then(allCountries => {
                setCountries(allCountries)
            })
    }, [])

    useEffect( () => {
        if(search.length < 1){
            setMatchingCountries([])
        } else {
            setMatchingCountries(countries.filter(country => country.toUpperCase().includes(search.toUpperCase())))
        }
    }, [search, countries])

    useEffect( () => {
        if(matchingCountries.length === 1){
            getCountryData(matchingCountries[0])
        } else {
            setCountryDisplayData(null)
        }
    }, [matchingCountries])

    const handleChangeSearch = (event) => {
        setSearch(event.target.value)
    }

    const getCountryData = (countryName) => {
        countryService
            .getCountry(countryName)
            .then(countryData => {
                //setCountryDisplayData(countryData)
                weatherService
                    .getWeather(countryData.capital.lat, countryData.capital.lon)
                    .then(weatherData => {
                        countryData.capital.temp = weatherData.temp
                        countryData.capital.wind = weatherData.wind
                        countryData.capital.weatherIcon = weatherData.icon
                        setCountryDisplayData(countryData)
                    })

            })
    }

    return (
        <div>
            find countries: <input onChange={handleChangeSearch} value={search} />
            { countryDisplayData ? <CountryDetail countryData={countryDisplayData} /> : <CountryList countries={matchingCountries} getCountryData={getCountryData} /> }
        </div>
    )
}

export default App
