const authValidationRules = require('./auth/auth.validator');
const userValidationRules = require('./user/user.validator');

module.exports = {
  ...authValidationRules,
  ...userValidationRules,
};
