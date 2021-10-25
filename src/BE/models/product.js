const mongoose = require('mongoose');
const shortid = require('shortid');
const Schema = mongoose.Schema;

const Product = new Schema({
	_id: {
		type: String,
		default: shortid.generate
	},
	name: {
		type: String,
		unique: true,
		required: true,
	},
	avatar: String,
	price: {
		type: Number,
		default: 0
	},
	quantity: {
		type: Number,
		default: 0
	},
	description: String,
	slugDm: String,
}, {
	timestamps: true,
});

module.exports = mongoose.model('product', Product);