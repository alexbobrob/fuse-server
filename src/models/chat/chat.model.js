const mongoose = require('mongoose');

const chatSchema = new mongoose.Schema({
  title: { type: String },
  type: { type: String },
  allow_copy: { type: Boolean },
  allow_add_members: { type: Boolean },
  allow_external_members: { type: Boolean },
  users: [{ type: mongoose.Schema.Types.ObjectId, ref: 'User' }],
  createdAt: { type: Date, immutable: true, default: Date.now },
  updatedAt: { type: Date, default: Date.now },
});

module.exports = mongoose.model('Chat', chatSchema);
