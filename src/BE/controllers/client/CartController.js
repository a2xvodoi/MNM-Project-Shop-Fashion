const Cart = require("../../models/Cart");

module.exports.cart = (req, res, next) => {
    const userId = req.session.customer._id;
    Cart.findOne({ userId })
        .populate("products.productId")
        .then((cart) => {
            req.session.customer.cart = {
                length: cart ? cart.products.length : 0,
            };
            const data = {
                cartProducts: cart ? cart.products : null,
            };
            res.render("client/cart", data);
        })
        .catch(next);
};
module.exports.buynow = (req, res, next) => {
    res.render("client/buy-product");
};
module.exports.receipt = (req, res, next) => {
    res.render("client/receipt");
};

module.exports.create = async(req, res) => {
    const { productId, size, color, quantity } = JSON.parse(req.body.data);

    const userId = req.session.customer._id; //TODO: the logged in user id

    try {
        let cart = await Cart.findOne({
            userId,
        });

        if (cart) {
            //cart exists for user
            let itemIndex = cart.products.findIndex(
                (p) => p.productId == productId && p.size == size && p.color == color
            );
            if (itemIndex > -1) {
                //product exists in the cart, update the quantity
                let productItem = cart.products[itemIndex];
                productItem.quantity = quantity;
                cart.products[itemIndex] = productItem;
            } else {
                //product does not exists in cart, add new item
                cart.products.push({
                    productId,
                    color,
                    size,
                    quantity,
                });
            }
            cart = await cart.save();
            req.session.customer.cart = {
                length: cart.products.length,
            };
            return res.status(201).json({
                quantityCart: req.session.customer.cart.length,
            });
        } else {
            //no cart for user, create new cart
            const newCart = await Cart.create({
                userId,
                products: [{
                    productId,
                    color,
                    size,
                    quantity,
                }, ],
            });

            req.session.customer.cart = {
                length: cart.products.length,
            };
            return res.status(201).json({
                quantityCart: req.session.customer.cart.length,
            });
        }
    } catch (err) {
        console.log(err);
        res.status(500).send("Something went wrong");
    }
};

module.exports.update = async(req, res, next) => {
    let updateCart = JSON.parse(req.body.data);
    const userId = req.session.customer._id; //TODO: the logged in user id

    try {
        let cart = await Cart.findOne({
            userId,
        });

        if (cart) {
            //cart exists for user
            let itemIndex = cart.products.findIndex((p) => p._id == req.params.id);
            if (itemIndex > -1) {
                //product exists in the cart, update the quantity
                let productItem = cart.products[itemIndex];
                productItem.quantity = updateCart.quantity;
                cart.products[itemIndex] = productItem;
            } else {
                //product does not exists in cart
                return res.json("");
            }
            cart = await cart.save();

            req.session.customer.cart = {
                length: cart.products.length,
            };
            return res.status(201).json({
                quantityCart: req.session.customer.cart.length,
            });
        } else {
            return res.status(201).send("");
        }
    } catch (err) {
        console.log(err);
        res.status(500).send("Something went wrong");
    }
};

module.exports.destroy = async(req, res, next) => {
    const userId = req.session.customer._id; //TODO: the logged in user id

    try {
        let cart = await Cart.findOne({
            userId,
        });

        if (cart) {
            //cart exists for user
            let itemIndex = cart.products.findIndex((p) => p._id == req.params.id);
            if (itemIndex > -1) {
                cart.products.splice(itemIndex, 1);
            } else {
                //product does not exists in cart
                return res.json("");
            }
            cart = await cart.save();

            req.session.customer.cart = {
                length: cart.products.length,
            };
            return res.status(201).json({
                status: 201,
                quantityCart: req.session.customer.cart.length,
            });
        } else {
            return res.status(201).send("");
        }
    } catch (err) {
        console.log(err);
        res.status(500).send("Something went wrong");
    }
};