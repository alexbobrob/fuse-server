const express = require('express')
const {
    checkEmailAvailability,
    validatorMiddleware,
} = require('../../middlewares')
const { authController } = require('../../controllers')

const router = express.Router()
router.post(
    '/signup',
    validatorMiddleware('registerAndLoginSchema'),
    checkEmailAvailability,
    authController.signUp,
)
router.post(
    '/signin',
    validatorMiddleware('registerAndLoginSchema'),
    authController.signIn,
)

module.exports = router
