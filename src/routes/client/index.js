const express = require('express');
const path = require('path');
const router = express.Router();

/* GET home page. */
router.get('/', (req, res, next) =>{
    res.render('client/products/index', { 
        layout: './client/layouts/main',
    });
});

module.exports = router;
