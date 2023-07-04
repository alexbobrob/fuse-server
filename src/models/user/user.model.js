const bcrypt = require('bcrypt')
const { isEmail } = require('validator')

const mongoose = require('mongoose')

const userSchema = new mongoose.Schema({
    fullName: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        unique: true,
        lowercase: true,
        validate: [isEmail, 'Please enter a valid email'],
    },
    password: { type: String },
    title: { type: String },
    role: { type: String },
    city: { type: String },
    country: { type: String },
    region: { type: String },
    firm: { type: String },
    sector: { type: String },
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
