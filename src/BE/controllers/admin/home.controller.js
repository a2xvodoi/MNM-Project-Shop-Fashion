module.exports.index = (req, res, next)=>{
    res.render('admin/index',{
        title: 'Bảng điều khiển',
        layout:'mainAd.hbs',
        session: req.session,
});
}