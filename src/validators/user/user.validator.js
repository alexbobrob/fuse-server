const { param } = require('express-validator');
const { isValidMongoId } = require('../custom');

const mongoIdValidationRule = () => {
  return [
    param('id')
      .custom(isValidMongoId)
      .withMessage('Id must be a valid MongoDB ID'),
  ];
};

module.exports = { mongoIdValidationRule };
