const Product = require('../../models/Product');
const Category = require('../../models/Category');

var formidable = require('formidable');
var mv = require('mv');

/**
 * Save single file
 */
const uploadSingle = (file) => {
    let oldPath = file.filepath;
    let newPath = 'public/upload/products/' + file.originalFilename;
    mv(oldPath, newPath, function (err) {
        if (err) throw err;
    });
    return '/upload/products/' + file.originalFilename;
}

/**
 * Save multiple file
 */
 const uploadMulti = (files) => {
     var path = [];
     files.forEach(file => {
        let oldPath = file.filepath;
        let newPath = 'public/upload/products/' + file.originalFilename;
        mv(oldPath, newPath, function (err) {
            if (err) throw err;
        });
        path = [
            ...path,
            '/upload/products/' + file.originalFilename,
        ]
    });
    
    return path;
}

module.exports = {
    // get /admin/products
    index : (req, res, next) => {
        var page = parseInt(req.query.page) || 1;
        var perPage =5;
                //var start = (page -1) * perPage;
                //var end = page * perPage;
        Product.find({}).populate('category').skip((perPage * page) - perPage) // in the first page the value of the skip is 0
        .limit(perPage).then(products => {
            Product.count((err, count) => { // count to calculate the number of pages
                if (err) return next(err);
            const data = {
                products: products,
                current: page,
                pages: Math.ceil(count / perPage)
            };
            

            res.render('admin/products/index', data);
        })
        .catch(next); // output just 9 items
        });
    },

    // get /admin/products/:_id
    detail: async (req, res, next) => {
        try {
            const product = await Product.findOne({ _id: req.params.id }).populate('category');
            res.render('admin/products/detail', {product: product})
        } catch (err) {
            next(err);
        }
    },

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

    // post /admin/product/create
    store: async (req, res, next) => {
        const session = await Product.startSession();
        session.startTransaction();
        try {
            const opts = { session, new: true };
            
            const data = JSON.parse(req.body.data);
            const product = await new Product(data);
            product.save(opts);
            console.log('success');
            await session.commitTransaction();
            session.endSession();
            res.json({
                status: 200,
                _id: product._id,
                type: 'create',
            });
        } catch (error) {
            console.log(error);
            await session.abortTransaction();
            session.endSession();
            res.json({status: 401});
        }
    },

    // get /admin/product/:_id/edit
    edit: (req, res, next) => {
        Product.findOne({ _id: req.params._id }).populate('category')
        .then((product) =>{
            // console.log(product);
            res.render('admin/products/edit', {product: product});
        })
        .catch(next);
    },

    // put /admin/product/:_id/update
    update: async (req, res, next) => {
        const session = await Product.startSession();
        session.startTransaction();
        try {
            const opts = { session, new: true };
            
            const data = JSON.parse(req.body.data);
            await Product.findOneAndUpdate({ _id: req.params._id }, data, opts);

            await session.commitTransaction();
            session.endSession();
            res.json({
                status: 200,
                _id: req.params._id,
                type: 'update',
            });
        } catch (error) {
            console.log(error);
            await session.abortTransaction();
            session.endSession();
            res.json({status: 401});
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
    },

    upload: async (req, res, next) => {
        const form = formidable({ multiples: true });

        const session = await Product.startSession();
        session.startTransaction();
        try {
            const opts = { session, new: true };

            // parse a file upload
            form.parse(req, async function (err, fields, files) {
                const avatar = files.avatar.originalFilename != '' ? uploadSingle(files.avatar) : '';
                var otherImg = '';
                if (typeof files.otherImg.length !== 'undefined') {
                    otherImg = uploadMulti(files.otherImg);
                } else {
                    otherImg = files.otherImg.originalFilename != '' ? uploadSingle(files.otherImg) : '';
                }
                const data = {
                    avatar: avatar, 
                    otherImg: otherImg
                };

                await Product.findOneAndUpdate({ _id: req.params._id }, data, opts);

                await session.commitTransaction();
                session.endSession();

                if (req.params.type === 'create') {
                    req.session.message = {
                        type: 'create',
                        status: 'success',
                    };
                }
                if (req.params.type === 'update') {
                    req.session.message = {
                        type: 'update',
                        status: 'success',
                    };
                }
                res.redirect('/admin/products');
            })
        } catch (error) {
            if (req.params.type === 'create') {
                req.session.message = {
                    type: 'create',
                    status: 'error',
                };
            }
            if (req.params.type === 'update') {
                req.session.message = {
                    type: 'create',
                    status: 'error',
                };
            }
            console.log(error);
            await session.abortTransaction();
            session.endSession();
            res.redirect('back');
        }
    }
}
