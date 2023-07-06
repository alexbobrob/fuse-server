const authController = require('./auth/auth.controller');
const profileController = require('./user/user.controller');
const agencyController = require('./agency/agency.controller');
const chatController = require('./chat/chat.controller');
const messageController = require('./message/message.controller');

module.exports = {
  authController,
  profileController,
  agencyController,
  chatController,
  messageController,
};
