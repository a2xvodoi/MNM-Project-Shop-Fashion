const express = require('express');
const router = express.Router();
const accountController= require('../../controllers/client/AccountController');

const productController = require('../../controllers/client/ProductController');
const homeController = require('../../controllers/client/HomeController');


/* GET home page. */
router.get('/',homeController.index)


/* GET list product page. */
router.get('/list-product', (req, res, next) => {
    res.render('client/list-product');
});

/* GET detail product page. */
router.get('/product-detail', (req, res, next) => {
    res.render('client/product-detail');
});

/* GET cart page. */
router.get('/cart', (req, res, next) => {
    res.render('client/cart');
});

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

/* GET register page. */
router.get('/register', accountController.register);

/* GET info user page. */
router.get('/info', (req, res, next) => {
    res.render('client/user-info');
});

/* GET search product page. */
router.get('/search', homeController.search);

/* GET info product page. */
router.get('/products/:_id', productController.detail);

//
router.post('/register', accountController.postRegister);
router.get('/thanh-cong', function (req, res, next) {
    res.json('thành công');
})
/* GET list-product page. */
router.get('/:category', homeController.listProduct);

//

module.exports = router;
