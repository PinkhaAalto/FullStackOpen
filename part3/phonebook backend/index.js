const express = require('express')
const app = express()
app.use(express.json())
app.use(express.static('tiny'))
const morgan = require('morgan')

const cors = require('cors')
app.use(cors())

app.use(express.static('dist'))

//define morgan
morgan.token('body', (request) => JSON.stringify(request.body))
app.use(morgan('tiny'))

const Person = require('./models/person.js');
const {errorHandler, unknownEndpoint} = require('./middleware/errorHandler.js')
const person = require('./models/person.js')
app.use(errorHandler)
app.use(unknownEndpoint)


app.get('/api/persons', (request, response, next) => {
  Person.find({})
    .then(res => {
      response.json(res)
    }) 
    .catch(error => next(error))
})

app.get('/api/info', (request, response, next) => {
  const timestamp = new Date()
  Person.find({})
    .then (res => {
      response.send(`<p>Phonebook has info for ${res.length()}</p>
      <p>${timestamp}</p>`)
    })
    .catch(error => next(error))
})

app.get(`/api/persons/:id`, (request, response, next) =>{
  const id = request.params.id
  Person.findById(id)
    .then (contact => {
      if(contact) {
        response.json(contact)
      } else{
        response.status(404).end()
      }
    }) 
    .catch(error => next(error))
})

app.delete('/api/persons/:id', (request, response, next) => {
  const id = request.params.id
  Person.findByIdAndRemove(id)
    .then(() => {
      response.status(204).end()
    })
    .catch(error => next(error))
})

app.post('/api/persons', morgan(':method :url :status :res[content] - :response-time ms :body') ,(request, response, next) => {
  const body = request.body

  if (!body.name || !body.number){
    return response.status(400).json({
      error: 'missing parameter'
    })
  }

  const contact = new Person ({
    name: body.name,
    number: body.number
  })

  contact.save()
    .then(res =>  {
      response.json(res)
    })
    .catch(error => error(next))
})

app.put('/api/persons/:id', (request, response, next) => {
  const body = request.body
  const name = body.name
  const number = body.number
  const id = params.id

  const person = Person.findByIdAndUpdate(id, {})
    .then (res)
  
})

const PORT = process.env.PORT || 3001
app.listen(PORT)
console.log(`Server running on port ${PORT}`)