const User = require('../../models/User');
const passport = require('passport');
require('../../config/passport');

module.exports = {
    index : (req, res, next)=>{
        res.render('admin/dashboard');
    },
    
    login : (req, res, next)=>{
        if (req.user) {
            res.redirect('/admin/dashboard');
        }
        res.render('admin/login');
    },

    postLogin : passport.authenticate('local', { 
        successRedirect: '/admin/dashboard',
        failureRedirect: '/admin/login',
    }),
    // postLogin: passport.authenticate('local'),
    // function(req, res) {
    //   // If this function gets called, authentication was successful.
    //   // `req.user` contains the authenticated user.
    //   res.redirect('/admin');
    // },

    logout : (req, res, next)=>{
        req.logout();
        res.redirect('/admin/login');
    },

}