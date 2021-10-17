const mongoose = require('mongoose');
const slug = require('mongoose-slug-generator');
const Schema = mongoose.Schema;

mongoose.plugin(slug);

const User = new Schema({
    tenTK: String,
    tenDangNhap: String,
    matKhau: String,
    soDienThoai: String,
    email: String,
    diaChi: String,
    maGP: Number,
    slug: {type: String, slug: 'tenDangNhap', unique:true},
},{
    timestamps: true,
}
);

module.exports = mongoose.model('user',User);