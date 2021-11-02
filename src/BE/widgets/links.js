const url = require('url');

module.exports = (req, res, next) => {
    const active = url.parse(req.url, true).path.split('/')[1];
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
    ];
    next();
}