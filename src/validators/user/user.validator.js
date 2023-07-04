const Joi = require('joi')
const id = require('../custom')

const idSchema = {
    params: Joi.object().keys({
        patientId: Joi.string().custom(id),
    }),
}

module.exports = { idSchema }
