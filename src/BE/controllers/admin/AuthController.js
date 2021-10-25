const User = require('../../models/user');

module.exports.login = (req, res, next) => {
    res.render('admin/login', {
        title: 'Đăng nhập',
        layout: 'mainAd.hbs',
        session: req.session,
    })
}

module.exports.postLogin = async (req, res, next) => {
    const user = await User.findOne({ tenDangNhap: req.body.tenDangNhap });
    req.session.account = {
        tenDangNhap: user.tenDangNhap,
        maGP: user.maGP,
        tenTK: user.tenTK,
        soDienThoai: user.soDienThoai,
        email: user.email,
        diaChi: user.diaChi,
    }
    res.json({ success: true });
}

module.exports.logout = (req, res, next) => {
    if (req.session.account) {
        req.session.account = {};
        res.redirect('/admin');
        return;
    }
    res.redirect('/admin');

}