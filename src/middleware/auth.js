const jwt = require('jsonwebtoken')
const JWT_KEY = process.env.JWT_KEY

// Middleware to verify JWT
const verifyToken = (req, res, next) => {
    const token = req.cookies.jwt // JWT stored in cookies

    if (!token) {
        return res.status(200).json({ isAuthenticated: false }) // No token, not authenticated
    }

    jwt.verify(token, JWT_KEY, (err, decoded) => {
        if (err) {
            return res.status(200).json({ isAuthenticated: false }) // Invalid token
        }
        req.user = decoded // Add the decoded JWT data to the request object
        next() // Proceed to the next middleware
    })
}


module.exports = { verifyToken}