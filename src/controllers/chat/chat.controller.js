const db = require('../../models');

const { Chat } = db;

const initializeChat = async (req, res) => {
  try {
    const {
      loggedInUserId,
      userId,
      type,
      allowCopy,
      allowAddMembers,
      allowExternalMembers,
    } = req.body;

    const chat = await Chat.find({
      type: 'one-to-one',
      $and: [
        { users: { $elemMatch: { $eq: loggedInUserId } } },
        { users: { $elemMatch: { $eq: userId } } },
      ],
    }).populate('users', '-password');
    if (chat.length > 0) return res.status(200).json(chat);

    const newChatData = {
      title: 'One to One Chat',
      type,
      allowCopy,
      allowAddMembers,
      allowExternalMembers,
      users: [loggedInUserId, userId],
    };

    const createdChat = await Chat.create(newChatData);
    const FullChat = await Chat.findOne({ id: createdChat._id }).populate(
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
    const loggedInUserId = req.params.id;
    const chat = await Chat.find({
      $and: [{ users: { $elemMatch: { $eq: loggedInUserId } } }],
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
