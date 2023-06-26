import { useState, useEffect } from 'react'
import personService from './services/persons'

const PersonList = ({personsToShow, destroyPerson}) => {
    return(
        <div>
            <h2>Numbers</h2>
            {personsToShow.map(person => <Person key={person.id} person={person} destroyPerson={destroyPerson}/>)}
        </div>
    )
}

const Person = ({person, destroyPerson}) => {
    return(
        <div>
            {person.name} {person.number} <button onClick={() => destroyPerson(person)}>delete</button>
        </div>
    )
}

const SearchFilter = ({search, handleSearchChange}) => (
    <div>
        filter shown with <input value={search} onChange={handleSearchChange}/>
    </div>
)

const PersonForm = (props) => (
    <form onSubmit={props.addPerson}>
        <div>
            <div>name: <input value={props.newName} onChange={props.handleNameChange}/> </div>
            <div>number: <input value={props.newNumber} onChange={props.handleNumberChange}/> </div>
        </div>
        <div>
            <button type="submit">add</button>
        </div>
    </form>
)


const App = () => {
    const [persons, setPersons] = useState([])
    const [newName, setNewName] = useState('')
    const [newNumber, setNewNumber] = useState('')
    const [search, setSearch] = useState('')

    useEffect(() => {
        personService
            .getAll()
            .then(initialPersons => {
                setPersons(initialPersons)
            })
    }, [])

    const handleNameChange = (event) => {
        setNewName(event.target.value)
    }

    const handleNumberChange = (event) => {
        setNewNumber(event.target.value)
    }

    const handleSearchChange = (event) => {
        setSearch(event.target.value)
    }

    const handleDestroyPerson = (personToDestroy) => {
        if(window.confirm(`Delete ${personToDestroy.name}?`)) {
            personService
                .destroy(personToDestroy.id)
                .then((message) => {
                    console.log(message)
                    setPersons(persons.filter(person => person.id !== personToDestroy.id))
                })
        }
    }

    const addPerson = (event) => {
        event.preventDefault()
        const exists = persons.find( person => person.name === newName.trim() )

        if(exists){
            if(window.confirm(`${newName.trim()} is already added to phonebook, replace the old number with a new one?`) ){
                const personObj = {
                    ...exists,
                    number: newNumber
                }
                personService
                    .update(exists.id, personObj)
                    .then(returnedPerson => {
                        setPersons(persons.map(person => person.id !== exists.id ? person : returnedPerson))
                        setNewName('')
                        setNewNumber('')
                    })
            }
        } else {
            const personObj = {
                name: newName.trim(),
                number: newNumber.trim()
            }
                personService
                    .create(personObj)
                    .then(returnedPerson => {
                        setPersons(persons.concat(returnedPerson))
                        setNewName('')
                        setNewNumber('')
                    })
            }
    }

    return (
        <div>
            <h1>Phonebook</h1>
            <SearchFilter search={search} handleSearchChange={handleSearchChange}/>
            <h2>Add a New Number</h2>
            <PersonForm addPerson={addPerson} newName={newName} handleNameChange={handleNameChange} newNumber={newNumber} handleNumberChange={handleNumberChange} />
            <PersonList personsToShow={persons.filter( person => person.name.toUpperCase().includes(search.trim().toUpperCase()) ) } destroyPerson={handleDestroyPerson} />
        </div>
    )
}

export default App
