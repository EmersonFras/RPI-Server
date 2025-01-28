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

router.post('/display', (req, res) => {
    if (!scriptProcess) {
        const { img } = req.body

        scriptProcess = spawn('sudo', ['../AlbumArt/album_art', img], {
            stdio: 'inherit',  // Inherit the stdio to see output in your server console
        })

        // Reset the scriptProcess variable when the script exits
        scriptProcess.on('close', (code) => {
            console.log(`Child process exited with code ${code}`)
            scriptProcess = null  // Reset on exit
        })

        res.send('Script started')
    } else {
        res.send('Script is already running')
    }
})

module.exports = router