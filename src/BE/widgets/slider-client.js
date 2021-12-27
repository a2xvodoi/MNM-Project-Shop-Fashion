const Slider = require('../models/Slider');

module.exports = async (req, res, next) => {
    const slider = await Slider.find();
    res.locals.slider = slider[0];
    next();
}
