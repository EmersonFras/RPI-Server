const weatherModel = require('../models/weatherModel')

// Get display settings
exports.getWeatherDisplay = (req, res) => {
  weatherModel.getWeatherDisplaySettings((err, row) => {
    if (err) {
      return res.status(500).json({ error: 'Failed to fetch data' })
    }
    res.json(row || { start_time: null, stop_time: null, text: null })
  })
}

// Update display settings
exports.updateWeatherDisplay = (req, res) => {
  const { start_time, stop_time, text } = req.body
  weatherModel.updateWeatherDisplaySettings(start_time, stop_time, text, (err, changes) => {
    if (err) {
      return res.status(500).json({ error: 'Failed to update data' })
    }
    res.json({ success: changes > 0 })
  })
}
