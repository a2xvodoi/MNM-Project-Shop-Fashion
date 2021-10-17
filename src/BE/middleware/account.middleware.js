const md5 = require('md5');
const User = require('../models/user');

module.exports = {
    checkExistAccount:async (req,res, next)=>{
        const user = await User.findOne({tenDangNhap: req.body.tenDangNhap});
        if (user) {
            let err = {};
            err.tenDangNhap = 'Tên đăng nhập đã tồn tại!!!';
            res.render('client/user/register', {
                title: 'register',
                err: err,
                value: req.body,
                session: req.session,
            });
            return;
        }
        next();
        
    },
    isLogin: function(req){
        return req.session.account
    },
    accountSession: function(req,user){
        req.session.account = {
            tenDangNhap: user.tenDangNhap,
            tenTK: user.tenTK,
            soDienThoai: user.soDienThoai,
            email: user.email,
            diaChi: user.diaChi
        };
    },
    validateregister: function(req){
        let err = {err: false};
        if(!req.body.tenDangNhap){
            err.tenDangNhap = 'Tên đăng nhập không được để trống!!!';
            err.err = true;
        }
        if(!req.body.matKhau){
            err.matKhau = 'Mật khẩu không được để trống!!!';
            err.err = true;
        }
        if(!req.body.tenTK){
            err.tenTK = 'Tên người dùng không được để trống!!!';
            err.err = true;
        }
        if(!req.body.soDienThoai){
            err.soDienThoai = 'Số điện thoại không được để trống!!!';
            err.err = true;
        }
        if(!req.body.diaChi){
            err.diaChi = 'Địa chỉ không được để trống!!!';
            err.err = true;
        }
        return err;
    },
    validateLogin: function(req){
        let err = {err: false};
        if(!req.body.tenDangNhap){
            err.tenDangNhap = 'Tên đăng nhập không được để trống!!!';
            err.err = true;
        }
        if(!req.body.matKhau){
            err.matKhau = 'Mật khẩu không được để trống!!!';
            err.err = true;
        }
        return err;
    },
    checkAccountLogin: function(req, user){
        let err = {err: false};
        if (!user) {
            err.userCheck = 'Tên tài khoản không tồn tại!!!';
            err.err = true;
            return err;
        }
        if (user.matKhau !== md5(req.body.matKhau)) {
            err.matKhauCheck = 'Mật khẩu không đúng!!!';
            err.err = true;
            return err;
        }
        return err;
    },
    outError: function(req, res,err){
        if (err.err) {
            res.render('client/user/login', {
                title: 'login',
                err: err,
                tenDangNhap: req.body.tenDangNhap,
                matKhau: req.body.matKhau,
                session: req.session,
            });
            return;
        }
    },
    outErrorRegister: function(req, res,err){
        if (err.err) {
            res.render('client/user/register', {
                title: 'Đăng ký',
                err: err,
                value: req.body,
                session: req.session,
            });
            return;
        }
    }
}
