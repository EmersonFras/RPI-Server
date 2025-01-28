const express = require('express')
const router = express.Router()
const axios = require('axios')
const jwt = require('jsonwebtoken')
const querystring = require('querystring')

const {
    SPOTIFY_CLIENT_ID,
    SPOTIFY_CLIENT_SECRET,
    SPOTIFY_REDIRECT_URI,
    JWT_KEY
} = process.env;

router.post('/', async (req, res) => {
    const code = req.body.code

    if (!code) {
        return res.status(400).json({ success: false, message: 'Authorization code is required' })
    }

    try {
        const response = await axios.post(
            'https://accounts.spotify.com/api/token',
            querystring.stringify({
                grant_type: 'authorization_code',
                code,
                redirect_uri: SPOTIFY_REDIRECT_URI,
                client_id: SPOTIFY_CLIENT_ID,
                client_secret: SPOTIFY_CLIENT_SECRET,
            }),
            {
                headers: {
                    'Content-Type': 'application/x-www-form-urlencoded',
                },
            }
        )

        
        const { access_token, refresh_token } = response.data
        const token = jwt.sign({ access_token, refresh_token }, JWT_KEY, {expiresIn: '1h'})
        
        res.cookie('jwt', token, {
            httpOnly: true,
            secure: true,
            sameSite: 'None',
            maxAge: 3600 * 1000, // 1 hour
        })
        console.log('Access token retrieved successfully')
        res.status(200).json({ success: true })
    } catch (error) {
        console.error('Error retrieving access token:', error.response?.data || error.message)
        res.status(500).json({ success: false, message: 'Error retrieving access token' })
    }
})


module.exports = router