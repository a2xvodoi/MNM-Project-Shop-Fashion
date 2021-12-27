const Product = require('../../models/Product');
const Rate = require('../../models/Rate');

module.exports.rate = (req, res, next) =>{
    Rate.find({productId: req.params.id}).populate('product')
    .then(rates => {
        res.json({rates: rates});
    })
    .catch(next);
};

module.exports.setRate = (req, res, next) => {
    const customer = res.locals.customer;
    const productId = req.params.id;
    let {name, email, content} = {...req.body};
    if (content) {
        if (customer) {
            name = customer.user_name;
            email = customer.email;
        }
        Rate.create({
            name, email, productId, content
        })
        .then(() => {
            res.json({
                status: 200,
                msg: 'Đánh giá thành công',
            })
        })
        .catch((er) =>{
            res.json({
                status: 300,
                msg: 'Đánh giá thất bại' + er
            });
        })
    }
};
