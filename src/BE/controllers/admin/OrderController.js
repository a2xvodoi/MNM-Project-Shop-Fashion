const Order = require('../../models/Order');

// get /admin/order
module.exports.index = (req, res, next) => {
    const filter = {};
    const now = new Date();
    const lastMonth = new Date();
    lastMonth.setFullYear(lastMonth.getFullYear() - 1);
    var date_from = lastMonth, date_to = now; 

    if (req.query._id) filter._id = req.query._id;
    if (req.query.full_name) filter.full_name = {$regex: req.query.full_name,$options: 'i'};
    if (req.query.status) filter.status = req.query.status;
    if (req.query.date_from) date_from = req.query.date_from;
    if (req.query.date_to) date_to = req.query.date_to;
    if (req.query.date_to || req.query.date_from) {
        filter.updatedAt = {
            $gte: date_from,
            $lte: date_to
        }
    }
    const page = parseInt(req.query.page) || 1;
    const perPage = 10;
    Order.find(filter).skip((perPage * page) - perPage)
    .limit(perPage)
    .then(orders => {
        Order.find(filter).count((err, count) => {
            if (err) return next(err);
            const data = {
                orders: orders,
                current: page,
                pages: Math.ceil(count / perPage),
                query: filter
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

// PATCH order confirm /admin/order/:id/confirm
module.exports.confirm = async (req, res, next) =>{
    const session = await Order.startSession();
    session.startTransaction();
    try {
        const opts = {
            session,
            new: true
        };
        const order = await Order.findOne({_id: req.params.id});
        if (order.status === 1) {
            throw new Error('Đơn hàng đang giao!');
        } else {
            order.status = 1;
        }
            
        await order.save(opts);
        await session.commitTransaction();
        session.endSession();

        res.json({status: 201});
    } catch (error) {
        await session.abortTransaction();
        session.endSession();
        next(error);
    }
}
