const mongoose = require("mongoose");
const shortid = require('shortid');
const Schema = mongoose.Schema;

const RateSchema = new Schema({
	_id: {
		type: String,
		default: shortid.generate
	},
    email: {
        type: String,
        trim: true,
    },
    name: {
        type: String,
        trim: true,
    },
    content: {
        type: String,
    },
    rate: {
        type: Number,
        default: 5
    },
    productId: {
        type: String,
        ref: "product"
    },
}, {
	timestamps: true
});

module.exports = mongoose.model('rate', RateSchema);