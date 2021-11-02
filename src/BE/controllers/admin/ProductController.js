// const Formidable = require('formidable');
// const cloudinary = require('../../models/ModelCloudinary');

const Product = require('../../models/Product');
const Category = require('../../models/Category');

module.exports = {
    // get /admin/product
    index : (req, res, next) => {
        Product.find({}).populate('category')
            .then(products => {
                const data = {
                    products: products,
                };
                res.render('admin/products/index', data);
            })
            .catch(next);
    },
    // get /admin/product/:_id
    // detail: async (req, res, next) => {
    //     try {
    //         const q = await Product.findOne({ _id: req.params._id });
    //         Category.findOne({ _id: toObj(q)._idDm })
    //             .exec((err, category) => {
    //                 if (err) {
    //                     res.json('Đã có lỗi xảy ra!');
    //                 }
    //                 res.render('admin/product/detailProduct', {
    //                     title: 'Chi tiết sản phẩm',
    //                     layout: 'mainAd.hbs',
    //                     product: q,
    //                     category: category,
    //                     session: req.session,
    //                 })
    //             })
    //     } catch (er) {
    //         res.send("Đã có lỗi xảy ra !!!   " + er + '<br>' + 'Vui lòng kiểm tra lại đường dẫn !!!');
    //     }
    // },
    // get /admin/product/:_id
    create: (req, res, next) => {
        Category.find({})
            .then(categories => {
                const data = {
                    categories: categories,
                };
                res.render('admin/products/create', data);
            })
            .catch(next);
    },
    // post /admin/product/create-product
    store: async (req, res, next) => {
        // parse a file upload
        // const form = new Formidable({multiples: true});
        const session = await Product.startSession();
        session.startTransaction();
        try {
            const opts = { session, new: true };
            // form.parse(req, async (err, fields, files) => {
            //     res.json(fields);return;
            //     // const cloud = await cloudinary.uploadSingle(files.avatar.path);
            //     var data = {
            //         ...fields,
            //         // avatar: cloud.url,
            //     };
            //     const product = await new Product(data);
            //     product.save(opts);
                
            //     await session.commitTransaction();
            //     session.endSession();
            //     console.log('success');
            //     req.session.message = {
            //         type: 'create',
            //         status: 'success',
            //     };
            //     res.redirect('/admin/products');
            // });
            const data = req.body;
            const product = await new Product(data);
                product.save(opts);
                
                await session.commitTransaction();
                session.endSession();
                console.log('success');
                req.session.message = {
                    type: 'create',
                    status: 'success',
                };
                res.json({status: 'success'});
                // res.redirect('/admin/products');
        } catch (error) {
            console.log(error);
            req.session.message = {
                type: 'create',
                status: 'error',
            };
            await session.abortTransaction();
            session.endSession();
            // res.redirect('back');
            res.json({status: 'failure'});
        }
    },
    // get /admin/product/:_id/edit
    edit: (req, res, next) => {
        Promise.all([Product.findOne({ _id: req.params._id }), Category.find({})])
            .then(([product, categories]) => {
                const data = {
                    product: product,
                    categories: categories,
                };
                res.render('admin/products/edit', data);
            })
            .catch(next);
    
    },
    // put /admin/product/:_id/update
    update: async (req, res, next) => {
        // parse a file upload
        const form = new Formidable();
        const session = await Product.startSession();
        session.startTransaction();
        try {
            const opts = { session, new: true };
            form.parse(req, async (err, fields, files) => {
                // const cloud = await cloudinary.uploadSingle(files.avatar.path);
                var data = {
                    ...fields,
                    // avatar: cloud.url,
                };
                await Product.findOneAndUpdate({ _id: req.params._id }, data, opts);
                
                await session.commitTransaction();
                session.endSession();
                req.session.message = {
                    type: 'update',
                    status: 'success',
                };
                console.log('success');
                res.redirect('/admin/products');
            });
        } catch (error) {
            req.session.message = {
                type: 'update',
                status: 'error',
            };
            console.log(error);
            await session.abortTransaction();
            session.endSession();
            res.redirect('back');
        }
    },
    // delete /admin/product/delete/:_id
    destroy: async (req, res, next) => {
        const session = await Product.startSession();
        session.startTransaction();
        try {
            const opts = { session, new: true };
                
            await Product.deleteOne({ _id: req.params._id }, opts);
            
            await session.commitTransaction();
            session.endSession();
    
            req.session.message = {
                type: 'delete',
                status: 'success',
            };
            console.log('success');
            res.redirect('/admin/products');
        } catch (error) {
            req.session.message = {
                type: 'delete',
                status: 'error',
            };
            console.log(error);
            await session.abortTransaction();
            session.endSession();
            res.redirect('back');
        }
    }
}
