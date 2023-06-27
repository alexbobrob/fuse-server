const express = require('express')
const { checkRequiredAndEmailAvailability } = require('../../middlewares')
const { authController } = require('../../controllers')

const router = express.Router()
router.post('/signup', checkRequiredAndEmailAvailability, authController.signUp)

module.exports = router
