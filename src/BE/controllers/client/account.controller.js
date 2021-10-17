const md5 = require('md5');
const User = require('../../models/user');
const accountMiddleware = require('../../middleware/account.middleware');

const { toObj } = require('../../util/mongooes');

module.exports.detail = (req, res, next) => {
    if (req.session.account.tenDangNhap === req.params.tenDangNhap) {
        User.findOne({ tenDangNhap: req.params.tenDangNhap })
            .then(user => {
                res.render('client/user/detailUser', {
                    title: 'Thông tin tài khoản',
                    user: toObj(user),
                    session: req.session,
                })
            })
            .catch(next);
    } else {
        req.session.destroy(function (err) {
        })
        res.send('Đây không phải tài khoản của bạn!!!!<a href="/account/login">Bạn có thể đăng nhập tại đây</a>');
    }

}

module.exports.register = (req, res, next) => {
    res.render('client/user/register', {
        title: 'register',
        session: req.session,
    });
};

module.exports.postRegister = (req, res, next) => {
    let data = req.body;
    accountMiddleware.outErrorRegister(req,res,accountMiddleware.validateregister(req));
    
    data.matKhau = md5(data.matKhau);
    data.maGP = 3;
    const user = new User(data);
    user.save()
        .then(() => res.redirect('/account/login'))
        .catch(next);
};

module.exports.login = (req, res, next) => {
    if (accountMiddleware.isLogin(req)) {
        next();
    } else {
        res.render('client/user/login', {
            title: 'login',
            session: req.session,
        });
    }
};

module.exports.postLogin = (req, res, next) => {
    let err = accountMiddleware.validateLogin(req);
    let data = req.body;
    accountMiddleware.outError(req,res,err);
    User.findOne({ tenDangNhap: data.tenDangNhap})
    .then(user => {
        let err = {err: false};
        if (!user) {
            err.userCheck = 'Tên tài khoản không tồn tại!!!';
            err.err = true;
            accountMiddleware.outError(req,res,err);
            return;
        }
        if (user.matKhau !== md5(req.body.matKhau)) {
            err.matKhauCheck = 'Mật khẩu không đúng!!!';
            err.err = true;
            accountMiddleware.outError(req,res,err);
            return;
        }
        accountMiddleware.accountSession(req,user);
        res.redirect('/');
    })
    .catch(next);
};

module.exports.logout = (req, res, next) => {
    req.session.destroy(function (err) {
    })
    res.redirect('/account/login');
};
