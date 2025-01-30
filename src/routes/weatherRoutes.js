const express = require('express')
const router = express.Router()
const weatherController = require('../controllers/weatherController')
const scriptManager = require('../utils/scriptManager')

// Define routes
router.get('/', weatherController.getWeatherDisplay)
router.post('/', weatherController.updateWeatherDisplay)

router.post('/display', (req, res) => {
    try {
        if (scriptManager.isRunning()) {
            scriptManager.stopScript()
        }

        /**
         * add --led-slowdown-gpio=4 to the C file
         * Make the weather app utilize the sql data
         */
        scriptManager.startScript('../Weather/weather_app')
        return res.status(200).json({message: 'Script started'})
    } catch (error) {
        return res.status(400).json({message: error.message})
    }
})

module.exports = router
