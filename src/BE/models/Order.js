const mongoose = require("mongoose");
const shortid = require('shortid');
const Schema = mongoose.Schema;

const OrderSchema = new Schema({
	_id: {
		type: String,
		default: shortid.generate
	},
	userId: {
		type: String,
		ref: "user"
	},
    full_name: {
        type: String,
    },
    email: {
        type: String,
        trim: true,
    },
    phone: {
        type: String,
        trim: true,
    },
    address: {
        type: String,
    },
    typePay: {
        type: String,
        default: 'COD',
    },
    status: {
        type: Number,
        default: 1,
    },
	products: [{
		productId: {
			type: String,
			ref: "product"
		},
		quantity: Number,
		color: {
            type: String,
            trim: true,
        },
		size: {
            type: String,
            trim: true,
        }
	}]
}, {
	timestamps: true
});

module.exports = mongoose.model('order', OrderSchema);