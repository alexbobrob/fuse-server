const authController = require('./auth/auth.controller');
const profileController = require('./user/user.controller');
const chatController = require('./chat/chat.controller');
const messageController = require('./message/message.controller');
const firmController = require('./firm/firm.controller');

module.exports = {
  authController,
  profileController,
  chatController,
  messageController,
  firmController,
};
