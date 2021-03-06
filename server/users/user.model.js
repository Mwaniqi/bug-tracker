const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const UserSchema = new Schema({
	username: { type: String, unique: true, lowercase: true, trim: true},
	password: {type: String, trim: true}
});

module.exports = mongoose.model('User', UserSchema);