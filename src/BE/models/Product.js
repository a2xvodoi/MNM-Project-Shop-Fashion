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
        		enum: ['4XL', '3XL','2XL','XL', 'L', 'M', 'S'],
			},
			color: {
				type: String,
				enum: ['Đỏ', 'Tím tham', 'Xanh', 'Vàng', 'Ghi đậm', 'Ghi nhạt', 'Cam', 'Nâu', 'Hồng', 'Đen', 'Rêu', 'Be', 'Ghi', 'Trắng', 'Xanh dương', 'Xanh lá'],
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