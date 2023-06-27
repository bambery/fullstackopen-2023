import countryService from './services/countries'

import { useState, useEffect } from 'react'

const CountryDetail = ({ countryData }) => {
    return(
        <div>
            <h1>{countryData?.name}</h1>
            <div>
                <div>Capital: {countryData?.capital}</div>
                <div>Area: {countryData?.area}</div>
            </div>
            <div>
                <h2>languages</h2>
                <ul>
                    {countryData.languages.map(lang => <li key={lang}>{lang}</li>)}
                </ul>
            </div>
            <img className='flag' src={countryData.flag}></img>
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
    }, [search])

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
                setCountryDisplayData(countryData)
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
