const Product = require('../../models/product');
const Category = require('../../models/category');
const {multiToObj} = require('../../util/mongooes');

module.exports.index = (req, res, next)=>{
    Promise.all([Product.find({}).limit(3),Category.find({}).sort({tenDm: -1})])
    .then(([products,category])=>{
        res.render('client/index', { title: 'w_fashion',
        products:multiToObj(products),
        category: multiToObj(category),
        session: req.session,
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

module.exports.get('/search', (req, res, next) =>{
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
