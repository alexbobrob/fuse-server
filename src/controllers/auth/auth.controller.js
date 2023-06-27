const bcrypt = require('bcrypt')
const db = require('../../models')

const { User } = db

const signUp = async (req, res) => {
    const { email, password } = req.body
    try {
        const salt = await bcrypt.genSalt()
        const passwordHash = await bcrypt.hash(password, salt)
        const newUser = new User({ email, password: passwordHash })
        const saveUser = await newUser.save()
        res.json(saveUser)
    } catch (error) {
        res.status(500).json({ err: error.message })
    }
}
module.exports = {
    signUp,
}
