const Product = require('../../models/product');
const Category = require('../../models/category');
const { multiToObj } = require('../../util/mongooes');
const { toObj } = require('../../util/mongooes');

// get /admin/product
module.exports.index = (req, res, next) => {
    Product.find({})
        .then(products => {
            res.render('admin/product/indexProduct', {
                title: 'Bảo trì sản phẩm',
                layout: 'mainAd.hbs',
                products: multiToObj(products),
                session: req.session,
            });
            // res.json(products);
        })
        .catch(next);
}
// get /admin/product/:slug
module.exports.detail = async (req, res, next) => {
    try {
        const q = await Product.findOne({ slug: req.params.slug });
        Category.findOne({ slug: toObj(q).slugDm })
            .exec((err, category) => {
                if (err) {
                    res.json('Đã có lỗi xảy ra!');
                }
                res.render('admin/product/detailProduct', {
                    title: 'Chi tiết sản phẩm',
                    layout: 'mainAd.hbs',
                    product: toObj(q),
                    category: toObj(category),
                    session: req.session,
                })
            })
    } catch (er) {
        res.send("Đã có lỗi xảy ra !!!   " + er + '<br>' + 'Vui lòng kiểm tra lại đường dẫn !!!');
    }


}

// get /admin/product/create-product
module.exports.createProduct = (req, res, next) => {
    Category.find({})
        .then(categories => {
            res.render('admin/product/createProduct', {
                title: 'Thêm sản phẩm',
                layout: 'mainAd.hbs',
                categories: multiToObj(categories),
                session: req.session,
            });
            // res.json(categories);
        })
        .catch(next);
}

// post /admin/product/create-product

module.exports.postCreateProduct = (req, res, next) => {
    // res.json(req.body)
    const product = new Product(req.body);
    product.save()
        .then(() => res.redirect('back'))
        .catch(next);
}

// get /admin/product/edit/:slug
module.exports.editProduct = (req, res, next) => {
    Promise.all([Product.findOne({ slug: req.params.slug }), Category.find({})])
        .then(([product, categories]) => {
            res.render('admin/product/editProduct', {
                title: 'Chỉnh sửa sản phẩm',
                layout: 'mainAd.hbs',
                product: toObj(product),
                categories: multiToObj(categories),
                session: req.session,
            });
        })
        .catch(next);

}
// put /admin/product/edit/:slug
module.exports.putEditProduct = (req, res, next) => {
    Product.findOneAndUpdate({ slug: req.params.slug }, req.body)
        .then(() => res.redirect('/admin/product'))
        .catch(next);
    // res.json(req.body);
}
// get /admin/product/delete/:slug
module.exports.deleteProduct = (req, res, next) => {
    const q = Product.findOne({ slug: req.params.slug });
    q.exec((err, product) => {
        // res.json(toObj(product).slugDm);
        Category.findOne({ slug: toObj(product).slugDm })
            .exec((err, category) => {
                res.render('admin/product/deleteProduct', {
                    title: 'Xóa sản phẩm',
                    layout: 'mainAd.hbs',
                    product: toObj(product),
                    category: toObj(category),
                    session: req.session,
                })
            })
    })

}
// delete /admin/product/delete/:slug
module.exports.deleteDestroyProduct = (req, res, next) => {
    Product.deleteOne({ slug: req.params.slug }, req.body)
        .then(() => res.redirect('back'))
        .catch(next);
    // res.json(req.body);
}