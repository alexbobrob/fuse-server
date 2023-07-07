const express = require('express');
const { validate } = require('../../middlewares');
const {
  mongoIdValidationRule,
  updateUserValidationRule,
} = require('../../validators');

const { profileController } = require('../../controllers');

const router = express.Router();

router.get('/', profileController.getUsers);
router.get(
  '/:id',
  mongoIdValidationRule(),
  validate,
  profileController.getUserById,
);
router.patch(
  '/:id',
  mongoIdValidationRule(),
  updateUserValidationRule(),
  validate,
  profileController.updateUser,
);
router.delete(
  '/:id',
  mongoIdValidationRule(),
  validate,
  profileController.deleteUser,
);

router.get('/search/:name', validate, profileController.getUserByName);

module.exports = router;
