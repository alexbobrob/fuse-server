const express = require('express');
const { validate } = require('../../middlewares');

const { messageController } = require('../../controllers');

const router = express.Router();

router.get('/:chatId', validate, messageController.allMessages);

router.post('/send', validate, messageController.sendMessage);

module.exports = router;
