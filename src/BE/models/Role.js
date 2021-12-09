const mongoose = require('mongoose');
const shortid = require('shortid');

const Schema = mongoose.Schema;

const Role = new Schema({
    _id: {
		type: String,
		default: shortid.generate
	},
    name: String,
    code: String,
},{
    timestamps: true,
}
);
  
module.exports = mongoose.model('role',Role);