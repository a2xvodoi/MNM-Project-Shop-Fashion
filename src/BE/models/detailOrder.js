const mongoose = require('mongoose');
const AutoIncrement = require('mongoose-sequence')(mongoose);

const Schema = mongoose.Schema;

const DetailOrder = new Schema({
    maDH : {type: Number, unique: true},
    nguoiNhan: String,
    diaChiNhan: String,
    status: String,
    products:[{
        ten: String,
        gia: Number,
        soLuong: Number,
        anh: String,
        kichThuoc: String,
        mauSac: String,
    }
    ]
}, {
    timestamps: true,
}
);
DetailOrder.plugin(AutoIncrement, {inc_field: 'maDH'});

module.exports = mongoose.model('detailOrder', DetailOrder);