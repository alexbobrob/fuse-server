const { body } = require('express-validator');

const updateUserValidationRule = () => {
  return [
    body('fullName').optional().isString().trim(),
    body('email').optional().isEmail().normalizeEmail(),
    body('password').optional().isString().trim(),
    body('title').optional().isString().trim(),
    body('role').optional().isString().trim(),
    body('city').optional().isString().trim(),
    body('country').optional().isString().trim(),
    body('region').optional().isString().trim(),
    body('firm').optional().isMongoId(),
    body('sector').optional().isString().trim(),
  ];
};
module.exports = { updateUserValidationRule };
