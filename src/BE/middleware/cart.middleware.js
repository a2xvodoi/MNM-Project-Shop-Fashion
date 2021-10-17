const Product = require('../models/product');

module.exports = {
    emtyCart: (req, res, next) =>{
        if (!req.session.cart) {
            req.session.cart = {};
        }
        if (!req.session.cart.products) {
            req.session.cart.products = [];
        }
        next();
    },
    isExistItem: (element,prod) =>{
        return element.ten === prod.ten && element.kichThuoc === prod.kichThuoc && element.mauSac === prod.mauSac;
    },
    addToCart: (ten,soLuong,prod,req) => {
        let products = req.session.cart.products;
        let product = {
            _id: prod._id,
            ten: ten,
            gia: parseInt(prod.gia) * soLuong,
            soLuong: soLuong,
            anh: prod.anh,
            kichThuoc: req.body.kichCo,
            mauSac: req.body.mauSac,
            slug: prod.slug,
            slugDm: prod.slugDm,
        }
        if (products.length > 0) {
            products.forEach(element => {
                if (element.ten === product.ten && element.kichThuoc === product.kichThuoc && element.mauSac === product.mauSac) {
                    element.soLuong += product.soLuong;
                    console.log('true');
                } else {
                    products.push(product);
                    console.log('false')
                }
                // if (element.ten.equals(product.ten) && element.kichThuoc.equals(product.kichThuoc) && element.mauSac.equals(product.mauSac)) {
                //     element.soLuong += soLuong;
                    
                // } else {
                //     products.push(product);
                    
                // }
            });
        } else {
            products.push(product);
        }
        var totals = 0;
        products.forEach(element => {
            totals += element.soLuong * parseInt(element.gia);
        });
        req.session.cart.totals = totals;
        req.session.cart.length = (req.session.cart.products) ? req.session.cart.products.length : 0;
    },
    cleanCart: (req) =>{
        req.session.cart.products =[];
        req.session.cart.totals = 0;
        req.session.cart.length = 0;
    }
}
