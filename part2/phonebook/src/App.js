import { useState } from 'react'

const App = () => {
    const [persons, setPersons] = useState([
        { name: 'Arto Hellas', number: '040-123456', id: 1 },
        { name: 'Ada Lovelace', number: '39-44-5323523', id: 2 },
        { name: 'Dan Abramov', number: '12-43-234345', id: 3 },
        { name: 'Mary Poppendieck', number: '39-23-6423122', id: 4 }
    ])
    const [newName, setNewName] = useState('')
    const [newNumber, setNewNumber] = useState('')
    const [search, setSearch] = useState('')

    const handleNameChange = (event) => {
        setNewName(event.target.value)
    }

    const handleNumberChange = (event) => {
        setNewNumber(event.target.value)
    }

    const handleSearchChange = (event) => {
        setSearch(event.target.value)
    }

    const addPerson = (event) => {
        event.preventDefault()
        const exists = persons.some( person => person.name === newName.trim() )
        if(exists){
            alert(`${newName.trim()} is already added to phonebook`)
            return
        }
        const personObj = {
            name: newName.trim(),
            number: newNumber.trim()
        }

        setPersons(persons.concat(personObj))
        setNewName('')
        setNewNumber('')
    }

    return (
        <div>
            <h1>Phonebook</h1>
            <div>filter shown with <input value={search} onChange={handleSearchChange}/> </div>
            <h2>Add a New Number</h2>
            <form onSubmit={addPerson}>
                <div>
                    <div>name: <input value={newName} onChange={handleNameChange}/> </div>
                    <div>number: <input value={newNumber} onChange={handleNumberChange}/> </div>
                </div>
                <div>
                    <button type="submit">add</button>
                </div>
            </form>
            <h2>Numbers</h2>
            { persons.filter( person => person.name.toUpperCase().includes(search.trim().toUpperCase()) ).map(person => <div key={person.name}>{person.name} {person.number}</div>) }
        </div>
    )
}

export default App
