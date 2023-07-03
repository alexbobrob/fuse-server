const Joi = require('joi')

const registerAndLoginSchema = {
    body: Joi.object({
        email: Joi.string().email().lowercase().required(),
        password: Joi.string().min(5).required(),
    }),
}

module.exports = { registerAndLoginSchema }
