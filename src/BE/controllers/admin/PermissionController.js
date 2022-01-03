const Role = require('../../models/Role');
const User = require('../../models/User');

module.exports = {
    index: (req, res, next) =>{
        const filter = {};
        if (req.query._id) filter._id = req.query._id;
        if (req.query.user_name) filter.user_name = {$regex: req.query.user_name,$options: 'i'};
        if (req.query.full_name) filter.full_name = {$regex: req.query.full_name,$options: 'i'};
        if (req.query.role) filter.role = req.query.role;
        if (req.query.status) filter.status = Number(req.query.status);
        const page = parseInt(req.query.page) || 1;
        const perPage = 10;

        Promise.all([
            User.find(filter)
                .where('userType').in(['admin', 'moderator'])
                .populate('role')
                .skip((perPage * page) - perPage)
                .limit(perPage), 
            Role.find({})
        ])
        .then(([users, roles]) => {
            User.find(filter).where('userType').in(['admin', 'moderator'])
                .count((err, count) => { // count to calculate the number of pages
                    if (err) return next(err);
                    const data = {
                        users: users,
                        roles: roles,
                        current: page,
                        pages: Math.ceil(count / perPage),
                        query: filter
                    };
                    res.render('admin/permissions/index', data);
                })
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
            if (req.user.userType !== 'moderator' && req.body.role === 'GeleME95A') {
                throw new Error('Không có quyền này!');
            }
            if (req.user.role._id == 'GeleME95A' && req.body.role !== 'GeleME95A') {
                throw new Error('Không có quyền này!');
            }
            await User.findOneAndUpdate({
                _id: req.params.id
            }, req.body, opts);

            await session.commitTransaction();
            session.endSession();
            res.json({status: 201});
        } catch (error) {
            console.log(1);
            await session.abortTransaction();
            session.endSession();
            res.json({status: 300});
        }
    },
    lock: async (req, res, next) => {
        const session = await User.startSession();
        session.startTransaction();
        try {
            const opts = {
                session,
                new: true
            };
            const user = await User.findOne({_id: req.params.id});
            if (user.userType === 'moderator' || user.userType === 'user') {
                throw new Error('Tài khoản này không thể thay đổi hoạt động!');
            }
            if (user.status === 1) {
                user.status = 0;
            } else {
                user.status = 1;
            }
                
            await user.save(opts);
            await session.commitTransaction();
            session.endSession();

            res.json({status: 201});
        } catch (error) {
            await session.abortTransaction();
            session.endSession();
            next(error);
        }
    },
}
