module.exports = (role) =>(req, res, next) =>{
    if (req.user.userType === 'moderator' || role == req.user.role.code) {
        next();
        return;
    }
    res.send('Bạn không có quyền truy cập chức năng này!Quay lại trung tâm điều khiển <a href="/admin">tại đây</a>');
}