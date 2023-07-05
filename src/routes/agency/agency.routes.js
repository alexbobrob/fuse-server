const express = require('express');
const { validate } = require('../../middlewares');
const {
  mongoIdValidationRule,
  createOrUpdateAgencyValidationRule,
} = require('../../validators');

const { agencyController } = require('../../controllers');

const router = express.Router();

router.get('/', agencyController.getAllAgencies);

router.get(
  '/:id',
  mongoIdValidationRule(),
  validate,
  agencyController.getAgencyById,
);

router.post(
  '/',
  createOrUpdateAgencyValidationRule(),
  validate,
  agencyController.createAgency,
);

router.patch(
  '/:id',
  mongoIdValidationRule(),
  createOrUpdateAgencyValidationRule(),
  validate,
  agencyController.updateAgency,
);

router.delete(
  '/:id',
  mongoIdValidationRule(),
  validate,
  agencyController.deleteAgencyById,
);

module.exports = router;
