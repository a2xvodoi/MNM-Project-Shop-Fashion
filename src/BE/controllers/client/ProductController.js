const Product = require('../../models/product');
const Category = require('../../models/category');

module.exports.info = (req, res, next) => {
    Promise.all([
        Product.findOne({ slug: req.params.infoProduct, slugDm: req.params.listProducts }),
        Category.findOne({ slug: req.params.listProducts })
    ])
        .then(([product, category]) => {
            res.render('client/info-product', {
                title: req.params.infoProduct,
                product: toObj(product),
                category: toObj(category),
                session: req.session,
            });
        })
        // Product.findOne({slug: req.params.infoProduct,slugDm: req.params.listProducts})
        //     .then(product => {
        //         res.render('client/info-product', { title: req.params.infoProduct,
        //         product: toObj(product),
        //      });
        //         // res.json(Product);
        //     })
        .catch(next);
};

module.exports.listJson = (req, res, next) => {
    var page = parseInt(req.query.page ? req.query.page : 1);
    var perPage = 2;
    Product.find({ slugDm: req.params.listProducts, })
        .then(total => {
            req.total = total.length
        })
    Product.find({ slugDm: req.params.listProducts, }).skip((page - 1) * perPage).limit(perPage)
        .then(list => {
            res.json({
                list: multiToObj(list),
                total: req.total
            })

        })
        .catch(next);

    // res.render('client/list-products', { title: 'list-products' });
};

module.exports.list = (req, res, next) => {
    var page = parseInt(req.query.page ? req.query.page : 1);
    var perPage = 12;

    // Promise.all([
    //     Product.find({ slugDm: req.params.listProducts, }).skip((page - 1) * perPage).limit(perPage),
    //     Category.findOne({ slug: req.params.listProducts }),
    // ])
    //     .then(([list, category]) => {
    //         res.render('client/list-products', {
    //             title: req.params.listProducts,
    //             list: multiToObj(list),
    //             category: toObj(category),
    //             session: req.session,
    //         })

    //     })
    //     .catch(next);

    Category.aggregate([
        {
            $lookup:
            {
                from: 'products',
                localField: 'slug',
                foreignField: 'slugDm',
                as: 'list'
            }
        }
    ])
    .then(list => {
        list.forEach(element => {
            if (element.slug === req.params.listProducts) {
                var lengthList = element.list.length;
                // res.json(element.list.slice((page-1)*perPage,perPage*page));
                element.list = element.list.slice((page-1)*perPage,perPage*page);
               
                res.render('client/list-products-demo', {
                    title: req.params.listProducts,
                    result: element,
                    totalPage: Math.ceil(lengthList/perPage),
                    currentPage: page,
                    session: req.session,
                })
                return;
            }
        });
    })
};

module.exports.detail = (req, res, next) => {
    Product.findById(req.params._id)
        .then(product => {
            const data = {
                product: product,
            };
            res.render('client/product-detail', data);
        })
        .catch(next);
};

