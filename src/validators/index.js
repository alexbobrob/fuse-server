const authValidator = require('./auth/auth.validator')
const userValidator = require('./user/user.validator')

module.exports = {
    ...authValidator,
    ...userValidator,
}
