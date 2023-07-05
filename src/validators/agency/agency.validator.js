const { body } = require('express-validator');

const createOrUpdateAgencyValidationRule = () => {
  return [body('name').isString()];
};
module.exports = { createOrUpdateAgencyValidationRule };
