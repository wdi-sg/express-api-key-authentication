// load in the environment vars
require('dotenv').config({silent: true})

const express = require('express')
const app = express()
const morgan = require('morgan')

// MIDDLEWARE
// plugin morgan for debugging information
app.use(morgan('dev'))

// CORS for all api routes - we could also define this on the app object in app.js
app.use(function (req, res, next) {
  res.header('Access-Control-Allow-Origin', '*')
  res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept, Auth-Token')
  next()
})

// ROUTES
// server everything in assets folder as static for images etc
app.use(express.static('public'))

// unprotected root route
app.get('/normal', (req, res) => {
  res.status(200).json({message: 'This is NOT secret information'})
})

// PROTECT ALL ROUTES THAT FOLLOW
app.use((req, res, next) => {
  const authToken = req.get('Auth-Token')
  if (!authToken || authToken !== process.env.AUTH_TOKEN) {
    res.status(401).json({error: 'unauthorised'})
  } else {
    next()
  }
})

// secret routes
app.get('/secret', (req, res) => {
  res.status(200).json({message: 'This is secret information'})
})

// ERRORS
// catch 404 and pass on to error handlers
app.use((req, res, next) => {
  var err = new Error('Not Found')
  err.status = 404
  next(err)
})

// Handle Errors in development
if (app.get('env') === 'development') {
  app.use((err, req, res, next) => {
    res.status(err.status || 500)
    res.json({
      message: err.message,
      error: err
    })
  })
}

// Handle errors in production with less information logged
app.use((err, req, res, next) => {
  res.status(err.status || 500)
  res.json({
    message: err.message,
    error: {}
  })
})

// START SERVER
app.listen(process.env.PORT, () => {
  console.log(`Server Listening on port ${process.env.PORT}`)
})
