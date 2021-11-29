const express = require('express');
const router = express.Router();
const accountController= require('../../controllers/client/AccountController');
const cartController= require('../../controllers/client/CartController');
const productController = require('../../controllers/client/ProductController');
const homeController = require('../../controllers/client/HomeController');

/* GET home page. */
router.get('/',homeController.index)

/* GET cart page. */
router.get('/cart', cartController.cart);
router.post('/cart/addCart', cartController.create);
router.patch('/cart/:id/update', cartController.update);
router.delete('/cart/:id/destroy', cartController.destroy);

/* GET pay page. */
router.get('/pay', (req, res, next) => {
    res.render('client/pay');
});

/* GET wishlist page. */
router.get('/wishlist', (req, res, next) => {
    res.render('client/wishlist');
});

/* GET contact page. */
router.get('/contact', (req, res, next) => {
    res.render('contact');
});

/* GET login page. */
router.get('/login', (req, res, next) => {
    res.render('client/login');
});

/* GET info user page. */
router.get('/info', (req, res, next) => {
    res.render('client/user-info');
});

/* GET search product page. */
router.get('/search', homeController.search);

/* GET info product page. */
router.get('/products/:_id', productController.detail);

/* Register user */
router.get('/register', accountController.register);
router.post('/register', accountController.postRegister);

/* Login user */
router.get('/login', accountController.login);
router.post('/login', accountController.postLogin);

/* Logout user */
router.get('/logout', accountController.logout);

/* GET list-product page. */
router.get('/:category', homeController.listProduct);


module.exports = router;
