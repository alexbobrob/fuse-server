const { param } = require('express-validator');

const mongoIdValidationRule = () => {
  return [param('id').isMongoId().withMessage('Id must be a valid MongoDB ID')];
};

module.exports = { mongoIdValidationRule };
