const authValidationRules = require('./auth/auth.validator');
const userValidationRules = require('./user/user.validator');
const firmValidationRules = require('./firm/firm.validator');
const commonValidationRules = require('./common/common.validator');

module.exports = {
  ...authValidationRules,
  ...userValidationRules,
  ...firmValidationRules,
  ...commonValidationRules,
};
