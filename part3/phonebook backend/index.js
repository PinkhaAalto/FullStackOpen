const express = require('express')
const app = express()
app.use(express.json())
const morgan = require('morgan')

const cors = require('cors')
app.use(cors())

app.use(express.static('dist'))

//define morgan
morgan.token('body', (request) => JSON.stringify(request.body))
app.use(morgan('tiny'))

let data = [
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
  response.json(data)
})

app.get('/api/info', (request, response) => {
  const timestamp = new Date()
  response.send(`<p>Phonebook has info for ${data.length} persons</p>
  <p>${timestamp}</p>`)
})

app.get(`/api/persons/:id`, (request, response) =>{
  const id = request.params.id
  const contact = data.find(contact => contact.id == id); 
  
  if (contact) {
    response.json(contact)
  } else {
    response.status(404).end()
  }
})

app.delete('/api/persons/:id', (request, response) => {
  const id = Number(request.params.id)
  data = data.filter(contact => contact.id !== id)
  response.status(204).end()
})

app.post('/api/persons', morgan(':method :url :status :res[content] - :response-time ms :body') ,(request, response) => {
  const body = request.body

  if (!body.name || !body.number){
    return response.status(400).json({
      error: 'missing parameter'
    })
  }

  const contact = {
    id: Math.floor(Math.random()*10000000000000),
    name: body.name,
    number: body.number
  }

  data.concat(contact)

  response.status(204).end();

})

const PORT = process.env.PORT || 3001
app.listen(PORT)
console.log(`Server running on port ${PORT}`)