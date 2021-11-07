const Product = require('../../models/Product');
const Category = require('../../models/Category');


module.exports.index = (req, res, next)=>{
    Promise.all([Product.find({}).limit(3),Category.find({}).sort({createdAt: -1})])
    .then(([products,category])=>{
        res.render('client/index', {
        products:products,
        category: category,
        });
    })
    .catch(next);

};

module.exports.json = (req, res, next) =>{
    Promise.all([Product.find({}).sort({createdAt: -1}),Category.find({})])
    .then(([products,category])=>{
        res.json({
            products: products,
            category: category,
        })
    })
    .catch(next);
}

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
