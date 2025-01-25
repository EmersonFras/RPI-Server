const express = require('express')
const cors = require('cors')
const corsOptions = require('./config/corsOptions')
const bodyParser = require('body-parser')
const displayRoutes = require('./routes/displayRoutes')
const authRoutes = require('./routes/authRoutes')

const app = express()



// Middleware
app.use(bodyParser.json())
app.use(cors(corsOptions))

// Routes
app.use('/api/display', displayRoutes)
app.use('/login', authRoutes)

module.exports = app
