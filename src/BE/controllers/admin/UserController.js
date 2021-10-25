const md5  = require('md5');
const User = require('../../models/user');
const {multiToObj} = require('../../util/mongooes');
const {toObj} = require('../../util/mongooes');

// get /admin/user
module.exports.index = (req, res, next)=>{
    User.find({})
    .then(users =>{
        res.render('admin/user/indexUser', { title: 'Quản lý tài khoản',
        layout: 'mainAd.hbs',
        users:multiToObj(users),
        session: req.session,
    });
        // res.json(users);
    })
    .catch(next);
}

// get /admin/user/create-user
module.exports.createUser = (req, res, next)=>{
    res.render('admin/user/createUser', { title: 'Thêm tài khoản',
    layout: 'mainAd.hbs',
    session: req.session,
    });
}

// post /admin/user/create-user

module.exports.postCreateUser = (req, res, next)=>{
    let data = req.body;
    data.matKhau = md5(data.matKhau);
    // res.json(req.body)
    const user = new User(data);
    user.save()
    .then(() => res.redirect('/admin/user'))
    .catch(next);
}

// get /admin/user/:userID/detail

module.exports.detailUser = (req, res, next) =>{
    User.findOne({_id: req.params.userID})
    .then(user =>{
        res.render('admin/user/detailUser',{
            title: 'Thông tin tài khoản',
            layout: 'mainAd.hbs',
            user: toObj(user),
            session: req.session,
        })
    })
}

// get /admin/user/:userID/edit

module.exports.editUser = (req, res, next) => {
    User.findOne({_id: req.params.userID})
    .then(user =>{
        res.render('admin/user/editUser',{
            title: 'Chỉnh sửa tài khoản',
            layout: 'mainAd.hbs',
            user: toObj(user),
            session: req.session,
        })
    })
}

// PUT /admin/user/:userID/edit

module.exports.putEditUser = (req, res, next) =>{
    User.findOneAndUpdate({_id: req.params.userID}, req.body)
    .then(() =>{
        res.redirect('/admin/user');
    })
    .catch(next);
    // res.json(req.body);
}

// get /admin/user/:userID/delete

module.exports.getDeleteUser = (req, res, next) => {
    User.findOne({_id: req.params.userID})
    .then(user =>{
        res.render('admin/user/deleteUser',{
            title: 'Xóa tài khoản',
            layout: 'mainAd.hbs',
            user: toObj(user),
            session: req.session,
        })
    })
}
// PUT /admin/user/:userID/edit

module.exports.deleteUser = (req, res, next) =>{
    User.deleteOne({ _id: req.params.userID }, req.body)
        .then(() => res.redirect('/admin/user'))
        .catch(next);
}
