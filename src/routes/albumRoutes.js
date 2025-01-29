const express = require('express')
const router = express.Router()
const axios = require('axios')
const scriptManager = require('../utils/scriptManager')

router.get('/', async (req, res) => {
    if (req.identifier !== 'valid_token') {
        return res.status(401).json({ isAuthenticated: false }) 
    }


    const accessToken = req.user.access_token

    try {
        const response = await axios.get('https://api.spotify.com/v1/search', {
            headers: {
                'Authorization': `Bearer ${accessToken}`
            },
            params: {
                q: req.query.q,
                type: 'album'
            }
        })
        res.json(response.data) 
    } catch (error) {
        res.status(500).send('Error occurred while fetching data from Spotify API')
    }
})


router.post('/display', (req, res) => {
    
    if (req.identifier !== 'valid_token') {
        return res.status(401).json({ isAuthenticated: false }) 
    }

    try {
        if (scriptManager.isRunning()) {
            scriptManager.stopScript()
        }

        const { img } = req.body

        scriptManager.startScript('../AlbumArt/album_art', [img])
        return res.send('Script started')
    } catch (error) {
        return res.status(400).send(error.message)
    }
})

module.exports = router