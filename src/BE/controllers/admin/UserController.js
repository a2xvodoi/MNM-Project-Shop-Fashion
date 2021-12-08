const User = require('../../models/User');

module.exports = {
    index: (req, res, next) => {
        const page = parseInt(req.query.page) || 1;
        const perPage = 10;
        
        User.find({}).skip((perPage * page) - perPage)
        .limit(perPage)
        .then(users => {
            User.count((err, count) => { // count to calculate the number of pages
                if (err) return next(err);
                const data = {
                    users: users,
                    current: page,
                    pages: Math.ceil(count / perPage)
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

            const data = JSON.parse(req.body.data);
            // console.log(data); return;
            const user = await new User(data);

            user.save(opts);

            await session.commitTransaction();
            session.endSession();
            console.log('success');
            req.session.message = {
                type: 'create',
                status: 'success',
            };
            res.json({
                status: 'success'
            });

            //res.redirect('/admin/users');
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




// // get /admin/user
// module.exports.index = (req, res, next)=>{
//     User.find({})
//     .then(users =>{
//         res.render('admin/user/index', { title: 'Quản lý tài khoản',
//         layout: 'mainAd.hbs',
//         users:multiToObj(users),
//         session: req.session,
//     });
//         // res.json(users);
//     })
//     .catch(next);
// }

// // get /admin/user/create-user
// module.exports.createUser = (req, res, next)=>{
//     res.render('admin/user/createUser', { title: 'Thêm tài khoản',
//     layout: 'mainAd.hbs',
//     session: req.session,
//     });
// }

// // post /admin/user/create-user

// module.exports.postCreateUser = (req, res, next)=>{
//     let data = req.body;
//     data.matKhau = md5(data.matKhau);
//     // res.json(req.body)
//     const user = new User(data);
//     user.save()
//     .then(() => res.redirect('/admin/user'))
//     .catch(next);
// }

// // get /admin/user/:userID/detail

// module.exports.detailUser = (req, res, next) =>{
//     User.findOne({_id: req.params.userID})
//     .then(user =>{
//         res.render('admin/user/detailUser',{
//             title: 'Thông tin tài khoản',
//             layout: 'mainAd.hbs',
//             user: toObj(user),
//             session: req.session,
//         })
//     })
// }

// // get /admin/user/:userID/edit

// module.exports.editUser = (req, res, next) => {
//     User.findOne({_id: req.params.userID})
//     .then(user =>{
//         res.render('admin/user/editUser',{
//             title: 'Chỉnh sửa tài khoản',
//             layout: 'mainAd.hbs',
//             user: toObj(user),
//             session: req.session,
//         })
//     })
// }

// // PUT /admin/user/:userID/edit

// module.exports.putEditUser = (req, res, next) =>{
//     User.findOneAndUpdate({_id: req.params.userID}, req.body)
//     .then(() =>{
//         res.redirect('/admin/user');
//     })
//     .catch(next);
//     // res.json(req.body);
// }

// // get /admin/user/:userID/delete

// module.exports.getDeleteUser = (req, res, next) => {
//     User.findOne({_id: req.params.userID})
//     .then(user =>{
//         res.render('admin/user/deleteUser',{
//             title: 'Xóa tài khoản',
//             layout: 'mainAd.hbs',
//             user: toObj(user),
//             session: req.session,
//         })
//     })
// }
// // PUT /admin/user/:userID/edit

// module.exports.deleteUser = (req, res, next) =>{
//     User.deleteOne({ _id: req.params.userID }, req.body)
//         .then(() => res.redirect('/admin/user'))
//         .catch(next);
// }