const express = require('express');
const router = express.Router();

const Product = require('../../models/Product');

/* GET home page. */
router.get('/', (req, res, next) =>{
    res.render('client/index', { 
        layout: './client/layouts/main',
    });
});

/* GET list product page. */
router.get('/list-product', (req, res, next) =>{
    res.render('client/list-product', { 
        layout: './client/layouts/main',
    });
});

/* GET detail product page. */
router.get('/product-detail', (req, res, next) =>{
    res.render('client/product-detail', { 
        layout: './client/layouts/main',
    });
});

/* GET cart page. */
router.get('/cart', (req, res, next) =>{
    res.render('client/cart', { 
        layout: './client/layouts/main',
    });
});

/* GET pay page. */
router.get('/pay', (req, res, next) =>{
    res.render('client/pay', { 
        layout: './client/layouts/main',
    });
});

/* GET wishlist page. */
router.get('/wishlist', (req, res, next) =>{
    res.render('client/wishlist', { 
        layout: './client/layouts/main',
    });
});

/* GET contact page. */
router.get('/contact', (req, res, next) =>{
    res.render('contact', { 
        layout: './client/layouts/main',
    });
});

/* GET login page. */
router.get('/login', (req, res, next) =>{
    res.render('client/login', { 
        layout: './client/layouts/main',
    });
});

/* GET register page. */
router.get('/register', (req, res, next) =>{
    res.render('client/register', { 
        layout: './client/layouts/main',
    });
});

/* GET info user page. */
router.get('/info', (req, res, next) =>{
    res.render('client/user-info', { 
        layout: './client/layouts/main',
    });
});

/* GET info user page. */
router.get('/search', (req, res, next) =>{
    const {search_product} = req.query;
        console.log(search_product);
     
       Product.find({name: {$regex: search_product,$options: 'i'  }}).exec()

            .then(products => {
                const data = {
                    products: products,
                };
                res.render('client/list-product', data);
            })
            .catch(next);
});


router.get('/products/:_id', (req, res, next) => {
    Product.findById(req.params._id)
        .then(product => {
            const data = {
                product: product,
            };
            res.render('client/product-detail', data);
        })
        .catch(next);
});

module.exports = router;
