const authMiddleware = require('./auth/auth.middleware')

module.exports = {
    ...authMiddleware,
}
