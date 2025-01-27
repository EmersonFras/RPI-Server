const express = require('express')
const router = express.Router()
const axios = require('axios')
import { verifyToken } from '../middleware/auth'

router.get('/', async (req, res) => {
    if (verifyToken(req, res)) {
        return res.status(401).json({ success: false, message: 'Unauthorized' })
    }

    const accessToken = req.user

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

module.exports = router