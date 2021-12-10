const Product = require('../../models/Product');
const Category = require('../../models/Category');

module.exports.listProduct = (req, res, next) =>{
    const page = parseInt(req.query.page) || 1;
    const perPage = 8;

    Product.find({category: req.params.category}).skip((perPage * page) - perPage)
    .limit(perPage)
    .then(products => {
        Product.find({category: req.params.category})
        .count((err, count) => { // count to calculate the number of pages
            if (err) return next(err);
            const data = {
                products: products,
                current: page,
                pages: Math.ceil(count / perPage)
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
