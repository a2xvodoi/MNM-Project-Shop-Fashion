const Category = require('../../models/Category');

module.exports = {
    // get /admim/category
    index: (req, res, next) => {
        const page = parseInt(req.query.page) || 1;
        const perPage = 10;
        Category.find({}).skip((perPage * page) - perPage)
        .limit(perPage)
        .then(categories => {
            Category.count((err, count) => { // count to calculate the number of pages
                if (err) return next(err);
                const data = {
                    categories: categories,
                    current: page,
                    pages: Math.ceil(count / perPage)
                };
                res.render('admin/categories/index', data);
            })
        })
        .catch(next);
    },
    // post admin/categories/store
    store: async (req, res, next) => {
        const session = await Category.startSession();
        session.startTransaction();
        try {
            const opts = {
                session,
                new: true
            };
            const category = await new Category(req.body);
            category.save(opts);
            
            await session.commitTransaction();
            session.endSession();
            req.session.message = {
                type: 'create',
                status: 'success',
            };
            console.log('success');
            res.redirect('/admin/categories');
        } catch (error) {
            req.session.message = {
                type: 'create',
                status: 'error',
            };
            console.log(error);
            await session.abortTransaction();
            session.endSession();
            res.redirect('back');
        }
    },

    //PATCH admin/categories/:_id/update
    update: async (req, res, next) => {
        const session = await Category.startSession();
        session.startTransaction();
        try {
            const opts = {
                session,
                new: true
            };
            await Category.findOneAndUpdate({
                _id: req.params._id
            }, req.body, opts);

            await session.commitTransaction();
            session.endSession();
            req.session.message = {
                type: 'update',
                status: 'success',
            };
            console.log('success');
            res.redirect('/admin/categories');
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

    // delete /admin/category/delete/:_id
    destroy: async (req, res, next) => {
        const session = await Category.startSession();
        session.startTransaction();
        try {
            const opts = {
                session,
                new: true
            };
            await Category.deleteOne({
                _id: req.params._id
            })

            await session.commitTransaction();
            session.endSession();

            req.session.message = {
                type: 'delete',
                status: 'success',
            };
            console.log('success');
            res.redirect('/admin/categories');
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
}