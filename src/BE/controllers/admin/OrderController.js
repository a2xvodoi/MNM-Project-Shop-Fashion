const Order = require('../../models/Order');

// get /admin/order
module.exports.index = (req, res, next) => {
    const page = parseInt(req.query.page) || 1;
    const perPage = 10;
    Order.find({}).skip((perPage * page) - perPage)
    .limit(perPage)
    .then(orders => {
        Order.count((err, count) => { // count to calculate the number of pages
            if (err) return next(err);
            const data = {
                orders: orders,
                current: page,
                pages: Math.ceil(count / perPage)
            };
            res.render('admin/orders/index', data);
        })
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
