module.exports.requiredLogin =(req, res, next) => {
    const pathLogin = req._parsedUrl.pathname;
    if (!req.user && !(pathLogin === '/admin/login')) {
        res.redirect('/admin/login');
    }
    res.locals.admin = req.user;
    next();
}

// module.exports.checkValidateFormLogin = (req, res, next) =>{
//     let errors ={err: false};
//     if (!req.body.tenDangNhap) {
//         errors.tenDangNhap= 'Tên đăng nhập không được để trống!!!';
//         errors.err = true;
//     }
//     if (!req.body.matKhau) {
//         errors.matKhau = 'Mật khẩu không được để trống!!!';
//         errors.err = true;
//     }
//     if(errors.err){
        
//         res.json({
//             errors:errors,
//         });
//         return;
//     }
//     next();
    
// }

// module.exports.checkAccountLogin = (req,res, next) =>{
//     User.findOne({tenDangNhap: req.body.tenDangNhap})
//     .then(user =>{
//         let errors ={err: false};
//         if (!user || user.matKhau !== md5(req.body.matKhau)) {
//             errors.existUser = 'Tên đăng nhập hoặc mật khẩu không đúng!!!';
//             errors.err = true;
//         }
//         if (errors.err) {
//             res.json({errors: errors});
//             return;
//         }
//         next();
//     })
//     .catch(error =>{
//         res.json({errors: error});
//     })
// }