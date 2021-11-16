const Category = require('../models/Category');

module.exports = async (req, res, next) => {
    const categories = await Category.find();
    res.locals.categories = categories;
    next();
}
