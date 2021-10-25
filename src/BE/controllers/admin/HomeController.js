module.exports.index = (req, res, next)=>{
    res.render('admin/dashboard',{
        title: 'Trung tâm điều khiển',
        layout:'./admin/layouts/main',
        session: req.session,
});
}