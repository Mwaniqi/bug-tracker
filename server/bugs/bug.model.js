const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const BugSchema = new Schema({
  description: { type: String, required: true},
  assigned: String
});

module.exports = mongoose.model('Bug', BugSchema);