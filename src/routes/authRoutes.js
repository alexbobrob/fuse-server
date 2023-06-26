const express = require('express')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')

const router = express.Router()

const secretKey = process.env.SECRET
const users = []

// Signup
router.post('/signup', async (req, res) => {
    const { username, password } = req.body

    if (users.some((user) => user.username === username)) {
        return res.status(400).json({ error: 'Username is already taken' })
    }

    try {
        const hashedPassword = await bcrypt.hash(password, 10)
        const newUser = { username, password: hashedPassword }
        users.push(newUser)
        res.sendStatus(201)
    } catch (error) {
        console.error('Error during signup:', error)
        res.sendStatus(500)
    }
})

// Login
router.post('/login', async (req, res) => {
    const { username, password } = req.body
    const user = users.find((currentUser) => currentUser.username === username)
    if (!user) {
        return res.status(401).json({ error: 'Invalid username or password' })
    }

    try {
        const passwordMatch = await bcrypt.compare(password, user.password)
        if (!passwordMatch) {
            return res
                .status(401)
                .json({ error: 'Invalid username or password' })
        }
        const token = jwt.sign({ username: user.username }, secretKey, {
            expiresIn: '1h',
        })

        res.json({ token })
    } catch (error) {
        console.error('Error during login:', error)
        res.sendStatus(500)
    }
})

module.exports = router
