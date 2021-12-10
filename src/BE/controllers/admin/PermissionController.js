const Role = require('../../models/Role');
const User = require('../../models/User');

module.exports = {
    index: (req, res, next) =>{
        const page = parseInt(req.query.page) || 1;
        const perPage = 10;

        Promise.all([
            User.find({})
            .where('userType').in(['admin', 'moderator'])
            .populate('role')
            .skip((perPage * page) - perPage)
            .limit(perPage), 
            Role.find({})
        ])
        .then(([users, roles]) => {
            User.where('userType').in(['admin', 'moderator']).count((err, count) => { // count to calculate the number of pages
                if (err) return next(err);
                const data = {
                    users: users,
                    roles: roles,
                    current: page,
                    pages: Math.ceil(count / perPage),
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
            await User.findOneAndUpdate({
                _id: req.params.id
            }, req.body, opts);

            await session.commitTransaction();
            session.endSession();
            res.json({status: 201});
        } catch (error) {
            await session.abortTransaction();
            session.endSession();
            res.json({status: 300});
        }
    }
}
