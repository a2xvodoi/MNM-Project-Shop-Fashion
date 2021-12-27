const Cart = require('../../models/Cart');
const Wishlist = require('../../models/Wishlist');

module.exports = {
    login : (req, res, next) =>{
        if (!req.session.customer) {
            if (req.method !== 'GET') {
                res.json({status: 403});
                return;
            }
            res.redirect('/login');
            return;
        }
        next();
    },
    identity : (req, res, next) => {
        if (req.session.customer) {
            const pathLogin = req._parsedOriginalUrl.pathname;
            if ((pathLogin === '/login')) {
                res.redirect('/');
            }
            const customer = req.session.customer;
            const userId = customer._id;

            Promise.all([Wishlist.findOne({ userId }), Cart.findOne({ userId })])
            .then(([wishlist, cart]) =>{
                customer.cart = {
                    length: cart ? cart.products.length : 0
                };
                customer.wishlist = {
                    length: wishlist ? wishlist.products.length : 0
                };
                res.locals.customer = customer;
                next();
            })
        } else {
            res.locals.customer = false;
            next();
        }
    }
}
