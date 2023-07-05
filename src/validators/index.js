const authValidationRules = require('./auth/auth.validator');
const userValidationRules = require('./user/user.validator');
const agencyValidationRules = require('./agency/agency.validator');
const commonValidationRules = require('./common/common.validator');

module.exports = {
  ...authValidationRules,
  ...userValidationRules,
  ...agencyValidationRules,
  ...commonValidationRules,
};
