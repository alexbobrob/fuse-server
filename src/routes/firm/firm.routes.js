const express = require('express');
const { validate } = require('../../middlewares');
const {
  mongoIdValidationRule,
  createOrUpdateFirmValidationRule,
} = require('../../validators');

const { firmController } = require('../../controllers');

const router = express.Router();

router.get('/', firmController.getAllFirms);

router.get(
  '/:id',
  mongoIdValidationRule(),
  validate,
  firmController.getFirmById,
);

router.post(
  '/',
  createOrUpdateFirmValidationRule(),
  validate,
  firmController.createFirm,
);

router.patch(
  '/:id',
  mongoIdValidationRule(),
  createOrUpdateFirmValidationRule(),
  validate,
  firmController.updateFirm,
);

router.delete(
  '/:id',
  mongoIdValidationRule(),
  validate,
  firmController.deleteFirmById,
);

module.exports = router;
