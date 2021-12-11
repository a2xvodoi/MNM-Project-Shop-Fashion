const User = require('../../models/User');

module.exports = {
    index: (req, res, next) => {
        const filter = {};
        if (req.query._id) filter._id = req.query._id;
        if (req.query.user_name) filter.user_name = {$regex: req.query.user_name,$options: 'i'};
        if (req.query.full_name) filter.full_name = {$regex: req.query.full_name,$options: 'i'};
        if (req.query.email) filter.email = {$regex: req.query.email,$options: 'i'};
        if (req.query.userType) filter.userType = req.query.userType;
        const page = parseInt(req.query.page) || 1;
        const perPage = 10;
        
        User.find(filter).skip((perPage * page) - perPage)
        .limit(perPage)
        .then(users => {
            User.find(filter).count((err, count) => { // count to calculate the number of pages
                if (err) return next(err);
                const data = {
                    users: users,
                    current: page,
                    pages: Math.ceil(count / perPage),
                    query: filter,
                };
                res.render('admin/users/index', data);
            })
        })
        .catch(next);
    },
    // delete /admin/users/delete/:_id
    destroy: async (req, res, next) => {
        const session = await User.startSession();
        session.startTransaction();
        try {
            const opts = {
                session,
                new: true
            };

            await User.deleteOne({
                _id: req.params._id
            }, opts);

            await session.commitTransaction();
            session.endSession();

            req.session.message = {
                type: 'delete',
                status: 'success',
            };
            console.log('success');
            res.redirect('/admin/users');
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
    create: (req, res, next) => {
        res.render('admin/users/create');
    },
    store: async (req, res, next) => {

        const session = await User.startSession();
        session.startTransaction();
        try {
            const opts = {
                session,
                new: true
            };

            const user = await new User(req.body);
            if (user.userType !== 'user') {
                user.role = 'iVPO2fzrK';
            }
            user.save(opts);

            await session.commitTransaction();
            session.endSession();
            console.log('success');
            req.session.message = {
                type: 'create',
                status: 'success',
            };
            res.redirect('/admin/users');
           
        } catch (error) {
            console.log(error);
            req.session.message = {
                type: 'create',
                status: 'error',
            };
            await session.abortTransaction();
            session.endSession();
            // res.redirect('back');
            res.json({
                status: 'failure'
            });
        }
    },
    // get /admin/user/:_id/edit
    edit: (req, res, next) => {
        User.findOne({
                _id: req.params._id
            })
            .then((users) => {
                const data = {
                    users: users,

                };
                res.render('admin/users/edit', data);
            })
            .catch(next);

    },
    update: async (req, res, next) => {

        const session = await User.startSession();
        session.startTransaction();
        try {
            const opts = {
                session,
                new: true
            };
            if (req.body.userType !== 'user') {
                req.body.role = 'iVPO2fzrK';
            }

            await User.findOneAndUpdate({
                _id: req.params._id
            }, req.body, opts);

            await session.commitTransaction();
            session.endSession();
            req.session.message = {
                type: 'update',
                status: 'success',
            };
            console.log('success');
            res.redirect('/admin/users');
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
    view: (req, res, next) => {
        User.findOne({
                _id: req.params._id
            })
            .then((users) => {
                const data = {
                    users: users,

                };
                res.render('admin/users/view', data);
            })
            .catch(next);

    },

}
