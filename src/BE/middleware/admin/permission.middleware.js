/*
    All roles: 1,
    Members: 3,
    Bảo trì sản phẩm: 4,
    Bảo trì đơn hàng: 2,
    Bảo trì danh mục: 5,
    Quản lí thành viên: 6,
    Phân quyền: 1,
*/
module.exports = (roleArray) =>(req, res, next) =>{
    var permiss = false;
    console.log(req.session.account.maGP);
    roleArray.forEach(role => {
        if (role == req.session.account.maGP) {
            permiss = true;
        }
          
    });
    if (permiss) {
        next();
        return;
    }
    res.render('admin/error',{
        title: 'Từ chối truy cập',
        layout: 'mainAd.hbs',
    });
}