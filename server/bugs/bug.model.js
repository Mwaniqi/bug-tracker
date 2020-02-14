const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const BugSchema = new Schema({
  summary: { type: String, required: true, trim: true},
  description: { type: String, required: true, trim: true}
});

module.exports = mongoose.model('Bug', BugSchema);