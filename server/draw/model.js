const mongoose = require('mongoose');

const { Schema } = mongoose;

const Draw = new Schema({
  draw: { type: Array },
  bet: { type: Array },
  winnigs: { type: String },
  date: { type: String }
}, { collection: 'draw', timestamps: true });

module.exports = mongoose.model('Draw', Draw);
