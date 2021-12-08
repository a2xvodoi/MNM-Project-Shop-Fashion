const Product = require('../../models/Product');
const Category = require('../../models/Category');


module.exports.index = (req, res, next)=>{
        Product.find({}).limit(5).sort({createdAt: 1})
        .then(products=>{
            res.render('client/index', {
                products,
            });
        })
        .catch(next);
};

module.exports.search = (req, res, next) =>{
    const {search_product} = req.query;
    const page = parseInt(req.query.page) || 1;
    const perPage = 8;

    Product.find({name: {$regex: search_product,$options: 'i'  }})
    .skip((perPage * page) - perPage)
    .limit(perPage)
    .then(products => {
        Product.count((err, count) => { // count to calculate the number of pages
            if (err) return next(err);
            const data = {
                products: products,
                current: page,
                pages: Math.ceil(count / perPage),
                q: search_product
            };
            res.render('client/list-product', data);
        })
    })
    .catch(next);
};



