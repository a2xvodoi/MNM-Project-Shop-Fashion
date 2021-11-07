const User= require('../../models/User');
// module.exports.detail = (req, res, next) => {
//     if (req.session.account.tenDangNhap === req.params.tenDangNhap) {
//         User.findOne({ tenDangNhap: req.params.tenDangNhap })
//             .then(user => {
//                 res.render('client/user/detailUser', {
//                     title: 'Thông tin tài khoản',
//                     user: toObj(user),
//                     session: req.session,
//                 })
//             })
//             .catch(next);
//     } else {
//         req.session.destroy(function (err) {
//         })
//         res.send('Đây không phải tài khoản của bạn!!!!<a href="/account/login">Bạn có thể đăng nhập tại đây</a>');
//     }

// }

module.exports.register = (req, res, next) => {
    res.render('client/register');
};

module.exports.postRegister = async function (req, res, next) {
    const session = await User.startSession();
        session.startTransaction();
        try {
            const opts = {
                session,
                new: true
            };
            const user = await new User(req.body);
            // console.log(user); return;
            user.save(opts);
            
            await session.commitTransaction();
            session.endSession();
            // req.session.message = {
            //     type: 'create',
            //     status: 'success',
            // };
            console.log('success');
            res.redirect('/thanh-cong');
        } catch (error) {
            // req.session.message = {
            //     type: 'create',
            //     status: 'error',
            // };
            await session.abortTransaction();
            session.endSession();
            res.redirect('back');
            console.log(error);
        }
    // res.redirect("/thanh-cong");
};


// module.exports.login = (req, res, next) => {
//     if (accountMiddleware.isLogin(req)) {
//         next();
//     } else {
//         res.render('client/user/login', {
//             title: 'login',
//             session: req.session,
//         });
//     }
// };

// module.exports.postLogin = (req, res, next) => {
//     let err = accountMiddleware.validateLogin(req);
//     let data = req.body;
//     accountMiddleware.outError(req,res,err);
//     User.findOne({ tenDangNhap: data.tenDangNhap})
//     .then(user => {
//         let err = {err: false};
//         if (!user) {
//             err.userCheck = 'Tên tài khoản không tồn tại!!!';
//             err.err = true;
//             accountMiddleware.outError(req,res,err);
//             return;
//         }
//         if (user.matKhau !== md5(req.body.matKhau)) {
//             err.matKhauCheck = 'Mật khẩu không đúng!!!';
//             err.err = true;
//             accountMiddleware.outError(req,res,err);
//             return;
//         }
//         accountMiddleware.accountSession(req,user);
//         res.redirect('/');
//     })
//     .catch(next);
// };

// module.exports.logout = (req, res, next) => {
//     req.session.destroy(function (err) {
//     })
//     res.redirect('/account/login');
// };
