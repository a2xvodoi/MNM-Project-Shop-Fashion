const Product = require('../../models/Product');
const Category = require('../../models/Category');
const {validationResult} = require('express-validator');

const formidable = require('formidable');
const mv = require('mv');

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
        const filter = {};
        if (req.query._id) filter._id = req.query._id;
        if (req.query.name) filter.name = {$regex: req.query.name,$options: 'i'};
        if (req.query.category) filter.category = req.query.category;
        const page = parseInt(req.query.page) || 1;
        const perPage = 10;
        Product.find(filter).populate('category').sort({updatedAt: -1})
        .skip((perPage * page) - perPage) // in the first page the value of the skip is 0
        .limit(perPage)
        .then(products => {
            Product.find(filter).count((err, count) => { // count to calculate the number of pages
                if (err) return next(err);
                const data = {
                    products: products,
                    current: page,
                    pages: Math.ceil(count / perPage),
                    query: filter,
                };
                res.render('admin/products/index', data);
            })
        })
        .catch(next);
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
        res.render('admin/products/create');
    },

    // post /admin/product/create
    store: async (req, res, next) => {
        const errors = validationResult(req);

        if (!errors.isEmpty()) {
            return res.json({
                status: 303,
                errors: errors.array(),
            });
        }

        const session = await Product.startSession();
        session.startTransaction();
        try {
            const opts = { session, new: true };
            
            const data = req.body.data;
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
            res.render('admin/products/edit', {product: product});
        })
        .catch(next);
    },

    // put /admin/product/:_id/update
    update: async (req, res, next) => {
        const errors = validationResult(req);

        if (!errors.isEmpty()) {
            return res.json({
                status: 303,
                errors: errors.array(),
            });
        }

        const session = await Product.startSession();
        session.startTransaction();
        try {
            const opts = { session, new: true };
            
            const data = req.body.data;
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
