const express = require('express');
const router = express.Router();

/* GET dashboard page. */
router.get('/dashboard', (req, res, next) =>{
    res.render('admin/dashboard', { 
        layout: './admin/layouts/main',
    });
});
/* GET list product page. */
router.get('/products', (req, res, next) =>{
    res.render('admin/products/index', { 
        layout: './admin/layouts/main',
    });
});

module.exports = router;