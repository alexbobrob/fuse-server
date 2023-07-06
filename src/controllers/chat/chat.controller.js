/* eslint-disable camelcase */
/* eslint-disable no-underscore-dangle */
const db = require('../../models');

const { Chat } = db;

const initializeChat = async (req, res) => {
  try {
    const {
      logged_in_user_id,
      user_id,
      type,
      allow_copy,
      allow_add_members,
      allow_external_members,
    } = req.body;

    const chat = await Chat.find({
      type: 'one-to-one',
      $and: [
        { users: { $elemMatch: { $eq: logged_in_user_id } } },
        { users: { $elemMatch: { $eq: user_id } } },
      ],
    }).populate('users', '-password');
    if (chat.length > 0) return res.status(200).json(chat);

    const newChatData = {
      title: 'One to One Chat',
      type,
      allow_copy,
      allow_add_members,
      allow_external_members,
      users: [logged_in_user_id, user_id],
    };

    const createdChat = await Chat.create(newChatData);
    const FullChat = await Chat.findOne({ _id: createdChat._id }).populate(
      'users',
      '-password',
    );
    res.status(200).json(FullChat);
  } catch (error) {
    res.status(500).json({ error: 'Failed to retrieve users' });
  }
};

const fetchChats = async (req, res) => {
  try {
    const logged_in_user_id = req.params.id;
    const chat = await Chat.find({
      $and: [{ users: { $elemMatch: { $eq: logged_in_user_id } } }],
    }).populate('users', '-password');

    res.status(200).send(chat);
  } catch (error) {
    res.status(400);
    throw new Error(error.message);
  }
};

module.exports = {
  fetchChats,
  initializeChat,
};
