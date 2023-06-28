const db = require('../../models')

const { User } = db

const handleErrors = (err) => {
    const errors = {}
    if (err.message.includes('User validation failed')) {
        Object.keys(err.errors).forEach((key) => {
            errors[key] = err.errors[key].message
        })
    }
    return errors
}

const signUp = async (req, res) => {
    const { email, password } = req.body
    try {
        const newUser = new User({ email, password })
        const saveUser = await newUser.save()
        res.json(saveUser)
    } catch (error) {
        const errors = handleErrors(error)
        res.status(500).json({ errors })
    }
}
module.exports = {
    signUp,
}
