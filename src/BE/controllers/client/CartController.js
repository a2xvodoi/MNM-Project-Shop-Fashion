const Product = require('../../models/Product');
const User = require('../../models/User');
const Cart = require('../../models/Cart');

module.exports.cart = (req, res, next)=>{
    // res.json(req.session.cart);
    // return;
    const userId = "FGGx4VnQs";

    Cart.findOne({ userId })
        .then(cart => {
            const data = {
                userId: cart.userId,
                products: cart.products,
            }
            res.render('client/cart', data);
        })
        .catch(next);
}

module.exports.addCart = async (req, res) => {
    console.log(req.body);
    const { productId, productAvatar, name, price, quantity } = req.body;
  
    const userId = "FGGx4VnQs"; //TODO: the logged in user id
  
    try {
      let cart = await Cart.findOne({ userId });
  
      if (cart) {
        //cart exists for user
        let itemIndex = cart.products.findIndex(p => p.productId == productId);
  
        if (itemIndex > -1) {
          //product exists in the cart, update the quantity
          let productItem = cart.products[itemIndex];
          productItem.quantity = quantity;
          cart.products[itemIndex] = productItem;
        } else {
          //product does not exists in cart, add new item
          cart.products.push({ productId, productAvatar, name, price, quantity });
        }
        cart = await cart.save();
        return res.status(201).send(cart);
      } else {
        //no cart for user, create new cart
        const newCart = await Cart.create({
          userId,
          products: [{ productId, productAvatar, name, price, quantity }]
        });
  
        return res.status(201).send(newCart);
      }
    } catch (err) {
      console.log(err);
      res.status(500).send("Something went wrong");
    }
};

/* module.exports.cart = (req, res, next)=>{
    // res.json(req.session.cart);
    // return;
    res.render('client/cart/cart',{
        title: 'Giỏ hàng của bạn',
        session: req.session,
    })
    
}
module.exports.postCart = (req, res, next) =>{
    let soLuong = parseInt(req.body.soLuong);
    let ten = req.body.ten;
    if(soLuong > 0) {
        Product.findOne({ten: ten}).then(prod => {
            cartMiddleware.addToCart(ten,soLuong,prod,req);
            res.redirect('/gio-hang');
        }).catch(err => {
           res.redirect('/');
        });
    } else {
        res.redirect('/');
    }
}

module.exports.update = (req,res,next) =>{
    let updateCart = JSON.parse(req.body.data);
    let status = false;
    updateCart.forEach(upProd => {
        req.session.cart.products.forEach(prod => {
            if (cartMiddleware.isExistItem(prod,upProd)) {
                prod.soLuong = upProd.soLuong;
                status = true;
            }
        });
    });
    res.json({status: status});
}

module.exports.deleteOne = (req, res, next) =>{
    let id = req.params.idPro;
    let products = req.session.cart.products;
    let status = false;
    for (let index = 0; index < products.length; index++) {
        if (products[index]._id === id) {
            products.splice(index,1);
            status = true;
        }
    }
    res.json({status: status});
}

module.exports.deleteAll = (req, res, next) =>{
    let status = false;
    if (req.session.cart) {
        cartMiddleware.cleanCart(req);
        status = true;
    }
    res.json({status: status});
}
// GET order /dat-hang

module.exports.order = async(req, res, next)=>{
    const q = await User.findOne({tenDangNhap: req.session.name});
    res.render('client/cart/order',{
        title : 'Đặt hàng',
        session: req.session,
    })
}

// POST order /dat-hang

module.exports.postOrder = (req, res,next) =>{
    const detailOrder = new DetailOrder({
        nguoiNhan: req.body.nguoiNhan,
        diaChiNhan: req.body.diaChiNhan,
        status: 'chưa giao',
        products: req.session.cart.products,
    });
    detailOrder.save()
    .then(() => res.redirect('/'))
    .catch(next);
} */