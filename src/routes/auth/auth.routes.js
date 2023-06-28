const express = require('express')
const {
    checkRequiredFields,
    checkEmailAvailability,
} = require('../../middlewares')
const { authController } = require('../../controllers')

const router = express.Router()
router.post(
    '/signup',
    checkRequiredFields,
    checkEmailAvailability,
    authController.signUp,
)
router.post('/signin', checkRequiredFields, authController.signIn)

module.exports = router
