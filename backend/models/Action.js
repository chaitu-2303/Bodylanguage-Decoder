const mongoose = require('mongoose');

const ActionSchema = new mongoose.Schema({
  type: { type: String, enum: ['train', 'detect'], required: true },
  timestamp: { type: Date, default: Date.now },
  user: { type: String, default: 'anonymous' },
  metadata: { type: mongoose.Schema.Types.Mixed },
});

module.exports = mongoose.model('Action', ActionSchema);
