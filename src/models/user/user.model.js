const bcrypt = require('bcrypt')
const { isEmail } = require('validator')

const mongoose = require('mongoose')

const userSchema = new mongoose.Schema({
    email: {
        type: String,
        required: true,
        unique: true,
        lowercase: true,
        validate: [isEmail, 'Please enter a valid email'],
    },
    password: { type: String, required: true },
    createdAt: { type: Date, immutable: true, default: Date.now },
    updatedAt: { type: Date, default: Date.now },
})

userSchema.pre('save', async function (next) {
    try {
        const salt = await bcrypt.genSalt(10)
        // eslint-disable-next-line no-invalid-this
        this.password = await bcrypt.hash(this.password, salt)
        next()
    } catch (error) {
        return next(error)
    }
})

module.exports = mongoose.model('User', userSchema)
