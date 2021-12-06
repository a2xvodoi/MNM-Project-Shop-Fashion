const Wishlist = require('../../models/Wishlist');

module.exports.wishlist = (req, res, next) => {
    const userId = req.session.customer._id;
    Wishlist.findOne({ userId }).populate('products.productId')
        .then(wishlist => {
            req.session.customer.wishlist = {
                length: wishlist ? wishlist.products.length : 0
            };
            const data = {
                wishlistProducts: wishlist ? wishlist.products: null,
            }
            res.render('client/wishlist', data);
        })
        .catch(next);
}

module.exports.create = async(req, res) => {
    const {
        productId
    } = JSON.parse(req.body.data);
    const userId = req.session.customer._id;
    try {
        let wishlist = await Wishlist.findOne({
            userId
        });
        if (wishlist) {
            //Wishlist exists for user
            let itemIndex = wishlist.products.findIndex(p => p.productId == productId);
            if (itemIndex > -1) {
                
            } else {
                //product does not exists in Wishlist, add new item
                wishlist.products.push({
                    productId,
                });
            }
            wishlist = await wishlist.save();
            req.session.customer.wishlist = {
                length : wishlist.products.length
            };
            return res.status(201).json({
                quantityWishlist: req.session.customer.wishlist.length
            });
        } else {
            console.log(productId);
            //no Wishlist for user, create new Wishlist
            const wishlist = await Wishlist.create({
                userId,
                products: [{
                    productId,
                }]
            });
            req.session.customer.wishlist = {
                length : wishlist.products.length
            };
            return res.status(201).json({
                quantityWishlist: req.session.customer.wishlist.length
            });
        }
    } catch (err) {
        console.log(err);
        res.status(500).send("Something went wrong");
    }
};

module.exports.destroy = async(req, res, next) => {
    const userId = req.session.customer._id; //TODO: the logged in user id
    try {
        let wishlist = await Wishlist.findOne({
            userId
        });
        if (wishlist) {
            //Wishlist exists for user
            let itemIndex = wishlist.products.findIndex(p => p._id == req.params.id);
            if (itemIndex > -1) {
                wishlist.products.splice(itemIndex, 1);
            } else {
                //product does not exists in Wishlist
                return res.json('');
            }
            wishlist = await wishlist.save();
            
            req.session.customer.wishlist = {
                length : wishlist.products.length
            };
            return res.status(201).json({
                status: 201,
                quantityWishlist: req.session.customer.wishlist.length
            });
        } else {
            return res.status(201).send('');
        }
    } catch (err) {
        console.log(err);
        res.status(500).send("Something went wrong");
    }
}
