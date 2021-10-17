const mongoose = require('mongoose');
const slug = require('mongoose-slug-generator');
const Schema = mongoose.Schema;

mongoose.plugin(slug);

const Product = new Schema({
  ten: String,
  anh: String,
  luongCo: { type: Number, default: 0 },
  gia: { type: Number, default: 0 },
  mauSac: String,
  kichThuoc: { type: String, default: "XXL" },
  slugDm: String,
  slug: { type: String, slug: "ten" , unique: true},
},{
    timestamps: true,
}
);

module.exports = mongoose.model('product',Product);