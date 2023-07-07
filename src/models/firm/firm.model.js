const mongoose = require('mongoose');

const firmSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    default: 'NA',
  },
  createdAt: { type: Date, immutable: true, default: Date.now },
  updatedAt: { type: Date, default: Date.now },
});

module.exports = mongoose.model('Firm', firmSchema);
