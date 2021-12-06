module.exports = (req, res, next) => {
    res.locals.sizes = ['4XL', '3XL','2XL','XL', 'L', 'M', 'S'];
    res.locals.colors = ['Đỏ', 'Tím tham', 'Xanh', 'Vàng', 'Ghi đậm', 'Ghi nhạt', 'Cam', 'Nâu', 'Hồng', 'Đen', 'Rêu', 'Be', 'Ghi', 'Trắng', 'Xanh dương', 'Xanh lá'];

    next();
}
