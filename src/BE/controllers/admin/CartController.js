const Order = require('../../models/detailOrder');
const { multiToObj } = require('../../util/mongooes');
const { toObj } = require('../../util/mongooes');

// get /admin/order
module.exports.index = (req, res, next) => {
    // Cart.find({})
    // .then(carts =>{
    //     res.render('admin/cart/indexCart', { title: 'Bảo trì đơn hàng',
    //     layout: 'mainAd.hbs',
    //     carts:multiToObj(carts),
    // });
    //     // res.json(carts);
    // })
    // .catch(next);
    Order.find({})
        .then(orders => {
            res.render('admin/order/indexOrder', {
                title: 'Bảo trì đơn hàng',
                layout: 'mainAd.hbs',
                orders: multiToObj(orders),
                session: req.session,
            })
            // res.json(orders);
        })
}

// get order detail admin/order/:maDH

module.exports.orderDetail = (req, res, next) =>{
    Order.findOne({maDH: req.params.maDH})
    .then(order =>{
        res.render('admin/order/detailOrder',{
            layout: 'mainAd.hbs',
            title: 'Chi tiết đơn hàng',
            order: toObj(order),
            session: req.session,
        })
    })
    .catch(next);
}
//DELETE order destroy admin/order/delete/:maDH

module.exports.orderDestroy = (req,res,next) =>{
    Order.deleteOne({maDH: req.body.maDH})
    .then(() =>{
        res.json({status: true});
    })
    .catch(() =>{
        res.json({status:false});
    });
}