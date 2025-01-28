const jwt = require('jsonwebtoken')
const JWT_KEY = process.env.JWT_KEY

// Middleware to verify JWT
const verifyToken = (req, res, next) => {
    const token = req.cookies.jwt // JWT stored in cookies

    if (!token) {
        req.identifier = 'no_token'
        return next()
        // return res.status(200).json({ isAuthenticated: false, identifier: req.identifier }) // No token, not authenticated
    }

    jwt.verify(token, JWT_KEY, (err, decoded) => {
        if (err) {
            req.identifier = 'invalid_token'
            return next()
            // return res.status(200).json({ isAuthenticated: false, identifier: req.identifier }) // Invalid token
        }
        req.user = decoded // Add the decoded JWT data to the request object
        req.identifier = 'valid_token'
        return next() // Proceed to the next middleware
    })
}

module.exports = verifyToken