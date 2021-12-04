const mongoose = require("mongoose");
const shortid = require('shortid');
const Schema = mongoose.Schema;

const CartSchema = new Schema({
	_id: {
		type: String,
		default: shortid.generate
	},
	userId: {
		type: String,
		ref: "user"
	},
	products: [{
		productId: {
			type: String,
			ref: "product"
		},
		quantity: Number,
		color: String,
		size: String
	}]
}, {
	timestamps: true
});

module.exports = mongoose.model('cart', CartSchema);