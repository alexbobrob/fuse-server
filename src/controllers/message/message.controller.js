/* eslint-disable camelcase */
/* eslint-disable no-underscore-dangle */
const db = require('../../models');

const { Message, User } = db;

const allMessages = async (req, res) => {
  try {
    const messages = await Message.find({ chat: req.params.chatId })
      .populate('sender')
      .populate('chat', '-users');
    res.json(messages);
  } catch (error) {
    res.status(400);
    throw new Error(error.message);
  }
};

const sendMessage = async (req, res) => {
  const { content, chatId, loggedInUserId } = req.body;

  if (!content || !chatId) {
    console.log('Invalid data passed into request');
    return res.sendStatus(400);
  }

  const newMessage = {
    sender: loggedInUserId,
    content,
    chat: chatId,
  };

  try {
    let message = await Message.create(newMessage);

    message = await message.populate('sender');
    message = await message.populate('chat', '-users');
    message = await User.populate(message, {
      path: 'chat.users',
    });

    res.json(message);
  } catch (error) {
    res.status(400);
    throw new Error(error.message);
  }
};

module.exports = { allMessages, sendMessage };
