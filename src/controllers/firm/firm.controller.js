const db = require('../../models');

const { Firm } = db;

const getAllFirms = async (_, res) => {
  try {
    const firms = await Firm.find();
    res.status(200).json(firms);
  } catch (error) {
    res.status(500).json({ error: 'Failed to retrieve firms' });
  }
};

const getFirmById = async (req, res) => {
  const { id } = req.params;
  try {
    const firm = await Firm.findById(id);
    if (!firm) {
      res.status(404).json({ error: 'Firm not found' });
    }
    res.status(200).json(firm);
  } catch (error) {
    res.status(500).json({ error: 'Something went wrong' });
  }
};

const createFirm = async (req, res) => {
  const { name } = req.body;
  try {
    const firm = await Firm.create({ name });
    res.status(200).json(firm);
  } catch (error) {
    res.status(500).json({ error: 'Failed to create firm' });
  }
};

const updateFirm = async (req, res) => {
  const { id } = req.params;
  const { name } = req.body;

  try {
    const firm = await Firm.findByIdAndUpdate(
      id,
      {
        name,
      },
      { new: true },
    );

    if (!firm) {
      return res.status(404).json({ error: 'Firm not found' });
    }

    res.status(200).json(firm);
  } catch (error) {
    res.status(500).json({ error: 'Failed to update Firm' });
  }
};

const deleteFirmById = async (req, res) => {
  const { id } = req.params;
  try {
    const firm = await Firm.findByIdAndDelete(id);
    if (!firm) {
      return res.status(404).json({ error: 'Firm not found' });
    }
    res.status(204).end();
  } catch (error) {
    res.status(500).json({ error: 'Failed to delete Firm' });
  }
};

module.exports = {
  getAllFirms,
  getFirmById,
  createFirm,
  updateFirm,
  deleteFirmById,
};
