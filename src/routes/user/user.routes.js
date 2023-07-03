const express = require('express')
const { validatorMiddleware } = require('../../middlewares')

const { profileController } = require('../../controllers')

const router = express.Router()

router.get('/', profileController.getUsers)
router.get(
    '/:id',
    validatorMiddleware('idSchema'),
    profileController.getUserById,
)
router.patch(
    '/:id',
    validatorMiddleware('idSchema'),
    profileController.updateUser,
)
router.delete(
    '/:id',
    validatorMiddleware('idSchema'),
    profileController.deleteUser,
)

module.exports = router
