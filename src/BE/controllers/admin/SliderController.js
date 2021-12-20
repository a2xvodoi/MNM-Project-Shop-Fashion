const Slider = require('../../models/Slider');

module.exports.index = (req, res, next) => {
    Slider.find()
    .then(slider => {
        res.render('admin/slider/index', {slider: slider[0]});
    })
    .catch(next)
}