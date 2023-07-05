const { body } = require('express-validator');

const userCredentialsValidationRules = () => {
  return [
    body('email').isEmail().withMessage('Invalid email').normalizeEmail(),
    body('password')
      .isLength({ min: 5 })
      .withMessage('Password must be at least 5 characters long'),
  ];
};

module.exports = { userCredentialsValidationRules };
