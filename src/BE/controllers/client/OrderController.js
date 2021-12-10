const Cart = require('../../models/Cart');
const Order = require('../../models/Order');

// GET /my-orders
module.exports.index = async(req, res, next) => {
    const userId = req.session.customer._id;
    Order.find({userId: userId}).populate('products.productId')
    .then(orders => {
        res.render("client/my-orders", {orders: orders});
    })
    .catch(next);
}

// GET order /order
module.exports.create = async(req, res, next) => {
    const userId = req.session.customer._id;
    Cart.findOne({ userId }).populate('products.productId')
    .then(cart => {
        const data = {
            cartProducts: cart ? cart.products: null,
            user: req.session.customer,
        }
        res.render('client/order', data);
    })
    .catch(next);
}

// POST order /order
module.exports.store = async (req, res, next) => {
    const session = await Order.startSession();
    session.startTransaction();
    try {
        const opts = { session, new: true };

        const userId = req.session.customer._id;
        const { full_name, email, phone, address } = req.body;
        const typePay = 'COD';
        const productOrder = await Cart.findOne({ userId });
        
        if (productOrder.products.length) {
            const order = new Order({
                'userId': userId,
                'full_name': full_name,
                'email': email,
                'phone': phone,
                'address': address,
                'typePay': typePay,
                'products': productOrder.products,
            });
            if (await order.save(opts)) {
                productOrder.products = [];
                await productOrder.save(opts);
    
                await session.commitTransaction();
                session.endSession();
    
                res.redirect('/');
                return;
            }    
        }
        throw new Error('Đặt hàng không thành công');
    } catch (error) {
        await session.abortTransaction();
        session.endSession();
        next(error);
    }
}
