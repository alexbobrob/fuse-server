const express = require('express');
const { validate } = require('../../middlewares');

const { chatController } = require('../../controllers');

const router = express.Router();

router.get('/:id', validate, chatController.fetchChats);

router.post('/', validate, chatController.initializeChat);

module.exports = router;
