const express = require('express')
const router = express.Router()
const axios = require('axios')
const querystring = require('querystring')
require('dotenv').config()
const { verifyToken } = require('../middleware/auth')

const {
    SPOTIFY_CLIENT_ID,
    SPOTIFY_CLIENT_SECRET,
    SPOTIFY_REDIRECT_URI,
    JWT_KEY
} = process.env;

// Define routes
router.get('/', function(req, res) {
    const scopes = 'user-read-private user-read-email'
    const queryParams = querystring.stringify({
        response_type: 'code',
        client_id: SPOTIFY_CLIENT_ID,
        scope: scopes,
        redirect_uri: SPOTIFY_REDIRECT_URI
    })

    res.redirect(`https://accounts.spotify.com/authorize?${queryParams}`)
})

router.post('/logout', (req, res) => {
    // Clear the JWT cookie
    res.clearCookie('jwt', {
        httpOnly: true,
        secure: true, 
        sameSite: 'None', 
    });

    res.status(200).json({ success: true, message: 'Logged out successfully' });
})

router.post('/refresh', async (req, res) => {
    const refresh_token = req.cookies.spotify_refresh_token

    if (!refresh_token) {
        return res.status(401).json({ success: false, message: 'Refresh token not found' })
    }

    try {
        const response = await axios.post(
            SPOTIFY_TOKEN_URL,
            querystring.stringify({
                grant_type: 'refresh_token',
                refresh_token,
                client_id: SPOTIFY_CLIENT_ID,
                client_secret: SPOTIFY_CLIENT_SECRET,
            }),
            { headers: { 'Content-Type': 'application/x-www-form-urlencoded' } }
        )

        const { access_token } = response.data

        // Update access token cookie
        res.cookie('spotify_access_token', access_token, {
            httpOnly: true,
            secure: false,
            sameSite: 'none',
            maxAge: 3600 * 1000, // 1 hour
        })

        res.status(200).json({ success: true })
    } catch (error) {
        console.error('Error refreshing token:', error.response?.data || error.message)
        res.status(500).json({ success: false, message: 'Error refreshing token' })
    }
})

// Auth check route
router.get('/check', verifyToken, (req, res) => {
    res.status(200).json({ isAuthenticated: true }) // Token is valid
})

module.exports = router