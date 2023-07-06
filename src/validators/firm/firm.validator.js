const { body } = require('express-validator');

const createOrUpdateFirmValidationRule = () => {
  return [body('name').isString()];
};
module.exports = { createOrUpdateFirmValidationRule };
