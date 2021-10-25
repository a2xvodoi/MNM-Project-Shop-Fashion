const mongoose = require('mongoose');
const shortid = require('shortid');
const Schema = mongoose.Schema;

const Category = new Schema({
	_id: {
		type: String,
		default: shortid.generate
	},
	name: {
		type: String,
		unique: true,
		required: true,
	},
}, {
	timestamps: true,
});

module.exports = mongoose.model('category', Category);