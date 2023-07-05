const authMiddleware = require('./auth/auth.middleware');
const validate = require('./validator/validator.middleware');

module.exports = {
  ...authMiddleware,
  ...validate,
};
