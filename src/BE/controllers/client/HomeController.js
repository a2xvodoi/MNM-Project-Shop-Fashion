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
        console.log(search_product);

       Product.find({name: {$regex: search_product,$options: 'i'  }}).exec()

            .then(products => {
                const data = {
                    products: products,
                };
                res.render('client/list-product', data);
            })
            .catch(next);
};

module.exports.listProduct = (req, res, next) =>{

    Product.find({category: req.params.category}).exec()

         .then(products => {
             const data = {
                 products: products,
             };
             res.render('client/list-product', data);
         })
         .catch(next);
};


