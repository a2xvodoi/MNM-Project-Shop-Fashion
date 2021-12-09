const Role = require('../../models/Role');

module.exports = {
    store: async (req, res, next) => {

        const session = await Role.startSession();
        session.startTransaction();
        try {
            const opts = {
                session,
                new: true
            };

            const data = req.body;
            const role = await new Role(data);

            role.save(opts);

            await session.commitTransaction();
            session.endSession();
            res.json({
                status: 'success',
                role: role
            });
        } catch (error) {
            console.log(error);
            await session.abortTransaction();
            session.endSession();
            // res.redirect('back');
            res.json({
                status: 'failure',
                error: error
            });
        }
    },
}
