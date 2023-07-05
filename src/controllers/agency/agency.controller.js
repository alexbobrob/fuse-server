const db = require('../../models');

const { Agency } = db;

const getAllAgencies = async (_, res) => {
  try {
    const agencies = await Agency.find();
    res.status(200).json(agencies);
  } catch (error) {
    res.status(500).json({ error: 'Failed to retrieve agencies' });
  }
};

const getAgencyById = async (req, res) => {
  const { id } = req.params;
  try {
    const agency = await Agency.findById(id);
    if (!agency) {
      res.status(404).json({ error: 'Agency not found' });
    }
    res.status(200).json(agency);
  } catch (error) {
    res.status(500).json({ error: 'Something went wrong' });
  }
};

const createAgency = async (req, res) => {
  const { name } = req.body;
  try {
    const agency = await Agency.create({ name });
    res.status(200).json(agency);
  } catch (error) {
    console.log('the error iz', error);
    res.status(500).json({ error: 'Failed to create agency' });
  }
};

const updateAgency = async (req, res) => {
  const { id } = req.params;
  const { name } = req.body;

  try {
    const agency = await Agency.findByIdAndUpdate(
      id,
      {
        name,
      },
      { new: true },
    );

    if (!agency) {
      return res.status(404).json({ error: 'Agency not found' });
    }

    res.status(200).json(agency);
  } catch (error) {
    res.status(500).json({ error: 'Failed to update agency' });
  }
};

const deleteAgencyById = async (req, res) => {
  const { id } = req.params;
  try {
    const user = await Agency.findByIdAndDelete(id);
    if (!user) {
      return res.status(404).json({ error: 'Agency not found' });
    }
    res.status(204).end();
  } catch (error) {
    res.status(500).json({ error: 'Failed to delete Agency' });
  }
};

module.exports = {
  getAllAgencies,
  getAgencyById,
  createAgency,
  updateAgency,
  deleteAgencyById,
};
