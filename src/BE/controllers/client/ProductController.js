const Product = require('../../models/Product');
const Category = require('../../models/Category');

module.exports.listProduct = (req, res, next) =>{
    const page = parseInt(req.query.page) || 1;
    const perPage = 8;
    const sort = {};

    switch (req.query.sort) {
        case 'price-ascending':
            sort.price = 1;
            break;
    
        case 'price-descending':
            sort.price = -1;
            break;
    
        case 'title-ascending':
            sort.name = 1;
            break;
    
        case 'title-descending':
            sort.name = -1;
            break;
    
        default:
            sort.updatedAt = -1;
            break;
    }
    Product.find({category: req.params.category})
    .sort(sort)
    .skip((perPage * page) - perPage)
    .limit(perPage)
    .then(products => {
        Product.find({category: req.params.category})
        .count((err, count) => { // count to calculate the number of pages
            if (err) return next(err);
            const data = {
                products: products,
                current: page,
                pages: Math.ceil(count / perPage),
                sort: req.query.sort
            };
            res.render('client/list-product', data);
        })
    })
    .catch(next);
};

module.exports.detail = async (req, res, next) => {
    try {
        const product = await Product.findById(req.params._id);
        const listProducts =  await Product.find({category: product.category, _id: { $ne: product._id }});
        const data = {
            product: product,
            listProducts: listProducts,
        };
        return res.render('client/product-detail', data);
    } catch (error) {
        next(error);
    }
};
