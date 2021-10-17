const Product = require('../../models/product');
const {multiToObj} = require('../../util/mongooes');

module.exports = (req, res, next) =>{
    let arr = []
    Product.find({})
    .then(list =>{
        list.forEach(item => {
            if (item.ten.toLowerCase().search(req.query.q.toLowerCase()) !== -1) {
                arr.push(item);
            }
        });
        res.render('client/search', { 
            title: 'tìm kiếm sản phẩm',
            list: multiToObj(arr),
            q: req.query.q,
            session: req.session,
        })
    })
    .catch(err =>{
        res.json('lỗi server!!!!');
    })
}