const mongoose = require('mongoose');
const slug = require('mongoose-slug-generator');
const Schema = mongoose.Schema;

mongoose.plugin(slug);

const Category = new Schema({
  tenDm: String,
  slug: { type: String, slug: "tenDm" , unique: true},
},{
    timestamps: true,
}
);

module.exports = mongoose.model('category',Category);