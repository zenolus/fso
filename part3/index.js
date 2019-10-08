const express = require('express')
const app = express()
const bodyParser = require('body-parser')
const morgan = require('morgan')
app.use(bodyParser.json())
app.use(express.static('build'))
app.use(morgan(function (tokens, req, res) {
    let ret = [
        tokens.method(req, res),
        tokens.url(req, res),
        tokens.status(req, res),
        tokens.res(req, res, 'content-length'), '-',
        tokens['response-time'](req, res), 'ms'
    ]
    if(String(tokens.method(req, res)) == "POST")
        ret = ret.concat(JSON.stringify(req.body))
    return ret.join(' ')
}))
let persons = [
    {
        name: "Arto Hellas",
        number: "040-123456",
        id: 1
    },
    {
        name: "Ada Lovelace",
        number: "39-44-5323523",
        id: 2
    },
    {
        name: "Dan Abramov",
        number: "12-34-567890",
        id: 3
    }
]
app.get('/api/persons', (request, response)=>{
    response.json(persons)
})
app.get('/info', (request, response) => {
    const n = persons.length
    const dt = new Date()
    const res = `
    <p>Phonebook has info for ${n} people</p>
    <p>${dt}</p>`
    response.send(res)
})
app.get('/api/persons/:id', (request, response) => {
    const id = Number(request.params.id)
    const person = persons.find(person => person.id === id)
    if(person)
        response.json(person)
    else
        response.status(404).end()
})
app.delete('/api/persons/:id', (request, response) => {
    const id = Number(request.params.id)
    persons = persons.filter(person => person.id !== id)
    response.status(204).end()
})
app.post('/api/persons', (request, response) => {
    const body = request.body
    if(!body.name || !body.number){
        return response.status(400).json({error: 'content missing'})
    }
    if(persons.find(person => person.name === body.name)){
        return response.status(400).json({error: 'name must be unique'})
    }
    const person = {
        id: Math.ceil(Math.random()*1000000000),
        name: body.name,
        number: body.number
    }
    //console.log(person)
    persons = persons.concat(person)
    response.json(persons)
})
const port = 3001
app.listen(port)
console.log(`Server running on port ${port}`)