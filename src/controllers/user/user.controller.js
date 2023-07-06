const db = require('../../models');

const { User } = db;

const getUsers = async (_, res) => {
  try {
    const users = await User.find().populate('firm');
    res.status(200).json(users);
  } catch (error) {
    res.status(500).json({ error: 'Failed to retrieve users' });
  }
};

const getUserById = async (req, res) => {
  const { id } = req.params;
  try {
    const user = await User.findById(id).populate('firm');
    if (!user) {
      res.status(404).json({ error: 'User not found' });
    }
    res.status(200).json(user);
  } catch (error) {
    res.status(500).json({ error: 'Failed to retrieve user' });
  }
};

const updateUser = async (req, res) => {
  try {
    const { country, region, city, role, title, sector, firm } = req.body;

    const user = await User.findByIdAndUpdate(
      req.params.id,
      {
        country,
        region,
        city,
        role,
        title,
        sector,
        firm,
      },
      { new: true },
    );

    if (!user) {
      return res.status(404).json({ error: 'User not found' });
    }

    res.status(200).json(user);
  } catch (error) {
    res.status(500).json({ error: 'Failed to update user' });
  }
};

const deleteUser = async (req, res) => {
  try {
    const user = await User.findByIdAndDelete(req.params.id);
    if (!user) {
      return res.status(404).json({ error: 'User not found' });
    }
    res.status(204).end();
  } catch (error) {
    res.status(500).json({ error: 'Failed to delete user' });
  }
};

module.exports = {
  getUsers,
  getUserById,
  updateUser,
  deleteUser,
};
