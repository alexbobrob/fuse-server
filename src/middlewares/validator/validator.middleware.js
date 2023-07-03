const validators = require('../../validators')

const validatorMiddleware = (validator) => {
    if (!Object.prototype.hasOwnProperty.call(validators, validator))
        throw new Error(`'${validator}' validator is not exist`)

    return async function validationChecker(req, res, next) {
        try {
            const validated = await validators[validator].validateAsync(
                req.body,
            )
            req.body = validated
            next()
        } catch (err) {
            if (err.isJoi) {
                return res.status(422).json({ error: err.message })
            }
            res.status(500).json({ error: 'Something went wrong' })
        }
    }
}

module.exports = { validatorMiddleware }
