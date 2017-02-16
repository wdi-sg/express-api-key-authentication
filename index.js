// load in the environment vars
require('dotenv').config({silent: true})

const express = require('express')
const app = express()
const logger = require('morgan')

app.use(logger('dev'))
// enable CORS for all routes and for our specific API-Key header
app.use(function (req, res, next) {
  res.header('Access-Control-Allow-Origin', '*')
  res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept, API-Key')
  next()
})

// ROUTES
// serve everything in assets folder as static, so we can get our single html page
app.use(express.static('public'))

// unprotected root route
app.get('/normal', (req, res) => {
  res.status(200).json({message: 'This is NOT secret information'})
})

// PROTECT ALL ROUTES THAT FOLLOW
app.use((req, res, next) => {
  const apiKey = req.get('API-Key')
  if (!apiKey || apiKey !== process.env.API_KEY) {
    res.status(401).json({error: 'unauthorised'})
  } else {
    next()
  }
})

// secret routes
app.get('/secret', (req, res) => {
  res.status(200).json({message: 'This is secret information'})
})

// START SERVER
app.listen(process.env.PORT, () => {
  console.log(`Server Listening on port ${process.env.PORT}`)
})
