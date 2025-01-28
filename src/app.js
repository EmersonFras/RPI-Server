const express = require('express')
const cors = require('cors')
const corsOptions = require('./config/corsOptions')
const bodyParser = require('body-parser')
const cookieParser = require('cookie-parser')
const albumRoutes = require('./routes/albumRoutes')
const displayRoutes = require('./routes/displayRoutes')
const authRoutes = require('./routes/authRoutes')
const callbackRoutes = require('./routes/callbackRoutes')
const apiRoutes = require('./routes/apiRoutes')
const verifyToken = require('./middleware/auth')

const app = express()

// Middleware
app.use(cookieParser())
app.use(bodyParser.json())
app.use(cors(corsOptions))
app.use(express.json())
app.use(express.urlencoded({extended: true}))
app.use(verifyToken)


// Routes
app.use('/api/display', displayRoutes)
app.use('/api/album', albumRoutes)
app.use('/api/', apiRoutes)
app.use('/auth', authRoutes)
app.use('/callback', callbackRoutes)

module.exports = app
