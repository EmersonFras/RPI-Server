const express = require('express')
const router = express.Router()
const axios = require('axios')

router.get('/', async (req, res) => {
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

module.exports = router