require('dotenv').config()

const PORT = process.env.PORT || 3001
const MONGODB_URI = process.env.NODE_ENV === 'test' 
  ? process.env.TEST_DATABASE_URI
  : process.env.DATABASE_URI

module.exports = {
  MONGODB_URI,
  PORT
}