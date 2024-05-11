const mongoose = require('mongoose')

if (process.argv.length<3) {
  console.log('missing password as argument')
  process.exit(1)
}


const password = process.argv[2]

const url =
  `mongodb+srv://FullStackAdmin:${password}@fullstackopen.q5p6yco.mongodb.net/?retryWrites=true&w=majority&appName=FullStackOpen`

mongoose.set('strictQuery',false)

console.log(url)

mongoose.connect(url)

const personSchema = new mongoose.Schema({
  name: String,
  number: String,
})

const Person = mongoose.model('Person', personSchema)

if(process.argv.length===3){
  
  Person.find({}).then(result => {
    console.log('Contact list: ')
    result.forEach(person => {
      console.log(`${person.name} ${person.number}`)
    })
    mongoose.connection.close()
  })

}else{
  const person = new Person({
    name: process.argv[3],
    number: process.argv[4],
  }) 
  
  person.save().then(result => {
    console.log(`Added contact for ${result.name} with number ${result.number} to contact list`)
    mongoose.connection.close()
  })
}