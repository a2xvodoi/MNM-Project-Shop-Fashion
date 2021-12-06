const User = require("../../models/User");
const bcrypt = require("bcryptjs");

module.exports.register = (req, res, next) => {
    res.render("client/register");
};

module.exports.postRegister = async function (req, res, next) {
    const session = await User.startSession();
    session.startTransaction();
    try {
        const opts = {
            session,
            new: true,
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
        console.log("success");
        res.redirect("/login");
    } catch (error) {
        // req.session.message = {
        //     type: 'create',
        //     status: 'error',
        // };
        await session.abortTransaction();
        session.endSession();
        res.redirect("back");
        console.log(error);
    }
    // res.redirect("/thanh-cong");
};

module.exports.login = (req, res, next) => {
    res.render("client/login");
};

module.exports.postLogin = async (req, res, next) => {
    // res.json(req.body);
    const user_name = req.body.user_name;
    const password = req.body.password;

    try {
        const user = await User.findOne({
            user_name
        });

        if (!user) {
            res.json("Không tìm thấy user");
            return;
        }
        const isCorrectPassword = await user.isValidPassword(password);

        if (!isCorrectPassword) return res.json("Mật khẩu sai");
        req.session.customer = {
            _id: user._id,
            user_name: user.user_name,
            email: user.email,
        };
        res.redirect("/");
    } catch (error) {
        next(error);
    }
};

module.exports.logout = (req, res, next) => {
    req.session.destroy(function (err) {});
    res.redirect("/");
};

module.exports.show = (req, res, next) => {
    const userId = req.session.customer._id;
    User.findById({
            _id: userId
        })
        .then((user) => {
            res.render("client/user-info", {
                user: user
            });
        })
        .catch(next);
};

module.exports.update = async (req, res, next) => {
    const userId = req.session.customer._id;
    const data = JSON.parse(req.body.data);
    const session = await User.startSession();
    session.startTransaction();

    try {
        const opts = {
            session,
            new: true
        };
        await User.findOneAndUpdate({
            _id: userId
        }, data, opts);

        await session.commitTransaction();
        session.endSession();
        res.status(201).json({
            status: 200,
            msg: 'success',
        })
    } catch (error) {
        await session.abortTransaction();
        session.endSession();
        res.status(300).json({
            status: 300,
            msg: 'error',
        })
    }
}
module.exports.updatePassword = async (req, res, next) => {
    const userId = req.session.customer._id;
    const data = JSON.parse(req.body.data);
    const session = await User.startSession();
    session.startTransaction();

    try {
        const opts = {
            session,
            new: true
        };

        const user = await User.findOne({_id: userId});
        const isCorrectPassword = await user.isValidPassword(data.passwordOld);
        if (!isCorrectPassword) {
            res.json('1');
        }
        
        user.password = data.passwordNew;
        user.save(opts);
        await session.commitTransaction();
        session.endSession();

        req.session.destroy();
        res.status(201).json({
            status: 200,
            msg: 'success',
        })
    } catch (error) {
        await session.abortTransaction();
        session.endSession();
        res.status(300).json({
            status: 300,
            msg: 'error',
        })
    }
}
