const app = require('./app')
const https = require('https')
const fs = require('fs')
require('dotenv').config()

const options = {
    key: fs.readFileSync('/etc/letsencrypt/live/rpi-display.duckdns.org/privkey.pem'),
    cert: fs.readFileSync('/etc/letsencrypt/live/rpi-display.duckdns.org/fullchain.pem')
}

https.createServer(options, app).listen(3000, () => {
    console.log('Server running at https://rpi-display.duckdns.org:3000');
})