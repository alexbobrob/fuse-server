const express = require('express');
const { validate } = require('../../middlewares');
const { mongoIdValidationRule } = require('../../validators');

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
  validate,
  profileController.updateUser,
);
router.delete(
  '/:id',
  mongoIdValidationRule(),
  validate,
  profileController.deleteUser,
);

module.exports = router;
