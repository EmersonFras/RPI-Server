const express = require('express')
const router = express.Router()
const querystring = require('querystring')
require('dotenv').config()

const {
    SPOTIFY_CLIENT_ID,
    SPOTIFY_REDIRECT_URI,
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

module.exports = router