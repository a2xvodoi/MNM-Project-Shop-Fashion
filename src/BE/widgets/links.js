const url = require('url');

module.exports = (req, res, next) => {
    const active = req._parsedUrl.pathname.split('/')[2];
    if (active === '') {
        res.redirect('/admin/dashboard');
    }   
    res.locals.links = [
        {
            link: '/admin/dashboard',
            name: 'Trung tâm điều khiển',
            icon: 'fas fa-tachometer-alt',
            active: (active === '' || active === 'dashboard') ? true : false,
        },
        {
            link: '/admin/products',
            name: 'Quản lí sản phẩm',
            icon: 'fas fa-tshirt',
            active: active === 'products' ? true : false,
        },
        {
            link: '/admin/categories',
            name: 'Quản lí danh mục',
            icon: 'fa fa-bars',
            active: active === 'categories' ? true : false,
        },
        {
            link: '/admin/orders',
            name: 'Quản lí đơn hàng',
            icon: 'fa fa-shopping-cart',
            active: active === 'orders' ? true : false,
        },
        {
            link: '/admin/users',
            name: 'Quản lí tài khoản',
            icon: 'fas fa-user',
            active: active === 'users' ? true : false,
        },
        {
            link: '/admin/permissions',
            name: 'Phân quyền',
            icon: 'fas fa-user',
            active: active === 'permissions' ? true : false,
        },
    ];
    next();
}
