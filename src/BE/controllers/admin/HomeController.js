const Product = require('../../models/Product');
const Category = require('../../models/Category');
const Order = require('../../models/Order');
const User = require('../../models/User');
const passport = require('passport');
require('../../config/passport');

module.exports = {
    index : (req, res, next)=>{
        Promise.all([Product.find(), Category.find(), Order.find(), User.find({userType: 'user'})])
        .then(([products, categories, orders, users]) => {
            const data = {
                products: products,
                categories: categories,
                orders: orders,
                users: users
            }
            res.render('admin/dashboard', data);
        })
        .catch(next);
    },
    
    login : (req, res, next)=>{
        if (req.user) {
            res.redirect('/admin/dashboard');
        }
        res.render('admin/login');
    },

    postLogin : (req, res, next)  =>{
        passport.authenticate('local', (err, user) =>{
            if (err)    return res.redirect('/admin/login');
            // Redirect if it fails
            if (!user){
                const errors = [
                    {
                        msg: 'Tên tài khoản, mật khẩu không chính xác'
                    }
                ]
                return res.render('admin/login', {errors: errors});
            };
            req.logIn(user, function(err) {
                if (err)    return next(err);
                // Redirect if it succeeds
                return res.redirect('back');
            });
        })(req, res, next)
    },
    logout : (req, res, next)=>{
        req.logout();
        res.redirect('/admin/login');
    },
}
