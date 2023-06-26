const jwt = require('jsonwebtoken')

const secretKey = process.env.SECRET

// Middleware to verify JWT token
const authenticateToken = (req, res, next) => {
    const token = req.headers.authorization
    if (token) {
        jwt.verify(token, secretKey, (err, decodedToken) => {
            if (err) {
                return res.sendStatus(403)
            }
            req.user = decodedToken
            next()
        })
    } else {
        res.sendStatus(401)
    }
}

module.exports = {
    authenticateToken,
}
