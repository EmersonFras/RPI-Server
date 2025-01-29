const express = require('express')
const router = express.Router()
const weatherController = require('../controllers/weatherController')

// Define routes
router.get('/', weatherController.getWeatherDisplay)
router.post('/', weatherController.updateWeatherDisplay)

module.exports = router
