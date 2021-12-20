const mongoose = require('mongoose');
const shortid = require('shortid');

const Schema = mongoose.Schema;

const Slider = new Schema({
    _id: {
		type: String,
		default: shortid.generate
	},
    banner: [String],
    category: [
        {
            category: String,
            link: String,
            img: String,
        }
    ],
    brand: [String],
    about: String,
});
  
module.exports = mongoose.model('slider',Slider);
