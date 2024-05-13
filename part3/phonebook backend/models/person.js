const mongoose = require('mongoose')

mongoose.set('strictQuery', false)

const url = process.env.DATABASE_URI

mongoose.connect(url)
  .then(result => {    
    console.log('connected to MongoDB')  
  })  
  .catch((error) => {    
    console.log('error connecting to MongoDB:', error.message)  
  })

const personSchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, "Contact requires a name"],
        minlength: 3
    },
    number: {
        type: String,
        required: [true, "Phone number is required for a contact"],
        minlength: 8,
        validate: {
            validator: function(v) {
                return /\d{2,3}-\d{6,}/.test(v);
            },
            message: props => `${props.value} is not a valid phone number!`
        }
    }
});

personSchema.set('toJson', {
  transform: (document, object) => {
    object.id = object.id.toString()
    delete object._id
    delete object._id
  }
})

module.exports = mongoose.model('Person', personSchema)