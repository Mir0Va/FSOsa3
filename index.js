const express = require('express')
const morgan = require('morgan')
const cors = require('cors')

const app = express()

app.use(cors())
app.use(express.json())
app.use(express.static('build'))
morgan.token('content', (req,res) => JSON.stringify(req.body))
app.use(morgan(":method :url :status :res[content-length] - :response-time ms :content"))

let numbers = [
    { 
      "id": 1,
      "name": "Arto Hellas", 
      "number": "040-123456"
    },
    { 
      "id": 2,
      "name": "Ada Lovelace", 
      "number": "39-44-5323523"
    },
    { 
      "id": 3,
      "name": "Dan Abramov", 
      "number": "12-43-234345"
    },
    { 
      "id": 4,
      "name": "Mary Poppendieck", 
      "number": "39-23-6423122"
    }
]

app.get('/api/persons', (request, response) => {
  response.json(numbers)
})

app.get("/info", (request,response) => {
    const date = new Date()
    const info = `<p>Phonebook has info for ${numbers.length} people</p><p> ${date}</p>`
    response.send(info) 
})

app.get('/api/persons/:id', (request, response) => {
    const id = Number(request.params.id)
    const person = numbers.find(person => person.id === id)
    if (person){
        response.json(person)
    }else{
        response.status(404).end()
    }
})

app.delete('/api/persons/:id', (request, response) => {
    const id = Number(request.params.id)
    numbers = numbers.filter(person => person.id !== id)
    
    response.status(204).end()
})

app.post('/api/persons',(request,response) => {
    const body = request.body
    const names=numbers.map(person=>person.name)
    
    if(!body.name || !body.number){
        return response.status(404).json({
            error: "name or number missing" 
        })
    }
    if(names.indexOf(body.name)!==-1){
        return response.status(404).json({
            error: "name must be unique"
        })
    }

    const person = {
        "id": Math.floor(Math.random() * 1000000),
        "name": body.name,
        "number": body.number
    }

    numbers=numbers.concat(person)

    response.json(person)
})

const PORT = process.env.PORT||3001
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`)
})