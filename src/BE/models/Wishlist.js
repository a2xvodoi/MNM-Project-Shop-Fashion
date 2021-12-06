const mongoose = require("mongoose");
const shortid = require('shortid');
const Schema = mongoose.Schema;

const WishlistSchema = new Schema({
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
	}]
}, {
	timestamps: true
});

module.exports = mongoose.model('wishlist', WishlistSchema);