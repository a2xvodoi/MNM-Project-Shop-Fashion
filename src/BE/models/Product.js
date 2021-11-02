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
	otherImg: [String],
	price: {
		type: Number,
		default: 0,
		min: 0,
	},
	size_color: [
		{
			size: {
				type: String,
        		enum: ['XL', 'L', 'M'],
			},
			color: {
				type: String,
				enum: ['Đen', 'Trắng', 'Xám'],
			},
			quantity: {
				type: Number,
				default: 0,
				min: 0,
			},
		}
	],
	description: String,
	category: {
		type: String,
		ref: 'category',
	}
}, {
	timestamps: true,
});

module.exports = mongoose.model('product', Product);