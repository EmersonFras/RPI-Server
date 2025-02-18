const express = require('express')
const router = express.Router()
const scriptManager = require('../utils/scriptManager')

router.get('/running', (req, res) => {
    try {
        if (scriptManager.isRunning()) {
            const script = scriptManager.getRunningScript()
            return res.status(200).json({ message: script })
        } else {
            return res.status(200).json({ message: "No script is running"})
        }
    } catch (error) {
        console.error('Error getting script:', error.message)
        return res.status(500).json({message: 'Failed to get the script name'})
    }
})

router.post('/stop', (req, res) => {
    try {
        if (scriptManager.isRunning()) {
            scriptManager.stopScript()
            return res.status(200).json({message: 'Script stopped successfully'})
        } else {
            return res.status(400).json({message: 'No script is currently running'})
        }
    } catch (error) {
        console.error('Error stopping script:', error.message)
        return res.status(500).json({message: 'Failed to stop the script'})
    }
})

module.exports = router