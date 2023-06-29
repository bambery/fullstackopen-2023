require('dotenv').config()
const express = require('express')
const morgan = require('morgan')
const cors = require('cors')
const app = express()
const Person = require('./models/person')

app.use(express.json())

morgan.token('postBody', (req, res) => { if (req.method === 'POST'){ return JSON.stringify(req.body)}})
app.use(morgan(':method :url :status :res[content-length] - :response-time ms :postBody'))
app.use(cors())
app.use(express.static('build'))

const generateId = () => {
    return Math.floor(Math.random() * 100000000)
}

app.get('/info', (request, response) => {
    response.send(`<div><p>Phonebook has info for ${persons.length} people.</p><p>${new Date}</p></div>`)
})

app.get('/api/persons', (request, response) => {
    Person.find({}).then(people => {
        response.json(people)
    })
})

app.get('/api/persons/:id', (request, response) => {
    const id = Number(request.params.id)
    const person = persons.find(person => person.id === id)
    if(person){
        response.json(person)
    } else {
        response.status(404).end()
    }
})

app.delete('/api/persons/:id', (request, response) => {
    const id = Number(request.params.id)
    persons = persons.filter(person => person.id !== id)

    response.status(204).end()
})

app.post('/api/persons', (request, response) => {
    const body = request.body

    if(!body.name || !body.number){
        return response.status(400).json({
            error: 'Missing name or number.'
        })
    }

    // checking for person existence is case-insensitive
    const exists = persons.find(p => p.name.toUpperCase() === body.name.toUpperCase())
    if(exists){
        return response.status(400).json({
            error: `${exists.name} already exists on the server.`
        })
    }

    const person = {
        name: request.body.name,
        number: request.body.number,
        id: generateId()
    }

    persons = persons.concat(person)
    response.json(person)
})

const PORT = process.env.PORT
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`)
})
