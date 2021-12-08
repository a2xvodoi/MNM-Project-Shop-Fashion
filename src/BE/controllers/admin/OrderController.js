const Order = require('../../models/Order');

// get /admin/order
module.exports.index = (req, res, next) => {
    Order.find({})
    .then(orders => {
        const data = {
            orders: orders,
        };
        res.render('admin/orders/index', data);
    })
    .catch(next);
}

// get order detail /admin/order/:id

module.exports.detail = (req, res, next) =>{
    Order.findOne({ _id: req.params.id }).populate('userId').populate('products.productId')
    .then((order) => {
        const data = {
            order: order,
        };
        // res.json(data);return;
        res.render('admin/orders/detail', data);
    })
    .catch(next);
}
