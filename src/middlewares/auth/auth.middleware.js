const jwt = require('jsonwebtoken')

const secretKey = process.env.SECRET

const db = require('../../models')

const { User } = db

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

const checkRequiredAndEmailAvailability = async (req, res, next) => {
    const { email, password } = req.body

    if (!email || !password) {
        return res.status(400).json({ error: 'Email or password is missing.' })
    }

    try {
        const existingUser = await User.findOne({ email })

        if (existingUser) {
            return res.status(400).json({ error: 'Email already taken' })
        }

        next()
    } catch (err) {
        return res.status(500).json({ error: 'Something went wrong' })
    }
}

module.exports = {
    authenticateToken,
    checkRequiredAndEmailAvailability,
}
