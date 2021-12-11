const express = require('express');
const router = express.Router();
const homeController = require('../../controllers/admin/HomeController');
const productController = require('../../controllers/admin/ProductController');
const categoryController = require('../../controllers/admin/CategoryController');
const orderController = require('../../controllers/admin/OrderController');
const userController = require('../../controllers/admin/UserController');
const permissionController = require('../../controllers/admin/PermissionController');

const size_color = require('../../widgets/size_color');
const categories = require('../../widgets/category-client');
const permission = require('../../middleware/admin/Permission');

/* GET dashboard page. */
router.get('/', homeController.index);

/* GET dashboard page. */
router.get('/dashboard', homeController.index);

/* GET login page. */
router.get('/login', homeController.login);

/* POST login page. */
router.post('/login', homeController.postLogin);

/* GET logout page. */
router.get('/logout', homeController.logout);

/* GET list product page. */
router.get('/products', permission(1), categories, productController.index);

/* GET add product page. */
router.get('/products/create', permission(1), categories, size_color, productController.create);

/* POST store product page. */
router.post('/products/create', permission(1), productController.store);

/* GET edit product page. */
router.get('/products/:_id/edit', permission(1), categories, size_color, productController.edit);

/* PUT edit product page. */
router.put('/products/:_id/update', permission(1), productController.update);

/* POST upload file page. */
router.post('/products/:_id/upload/:type', permission(1), productController.upload);

/* GET detail product page. */
router.get('/products/:id', permission(1), productController.detail);

/* DELETE delete product page. */
router.delete('/products/:_id/destroy', permission(1), productController.destroy);

/* GET list category page. */
router.get('/categories', permission(2), categoryController.index);

/* POST store category page. */
router.post('/categories', permission(2), categoryController.store);

/* PATCH update category page. */
router.patch('/categories/:_id/update', permission(2), categoryController.update);

/* DELETE delete category page. */
router.delete('/categories/:_id/destroy', permission(2), categoryController.destroy);

/* GET list order page. */
router.get('/orders', permission(3), orderController.index);

/* GET detail order page. */
router.get('/orders/:id', permission(3), orderController.detail);

/* GET list user page. */
router.get('/users', permission(4), userController.index);
/* DELETE delete user page. */
router.delete('/users/:_id/destroy', permission(4), userController.destroy);
/* Get store user page. */
router.get('/users/create', permission(4), userController.create);
/* POST create user page. */
router.post('/users/create', permission(4), userController.store);
/* GET edit user page. */
router.get('/users/:_id/edit', permission(4), userController.edit); 
/* PUT update user page. */
router.put('/users/:_id/update', permission(4), userController.update);
/* get view user page. */
router.get('/users/:_id/view', permission(4), userController.view);

/* GET list user permission page. */
router.get('/permissions', permission(5), permissionController.index);
/* PATCH user permission page. */
router.patch('/permissions/:id/update', permission(5), permissionController.update);
router.patch('/permissions/:id/lock', permission(5), permissionController.lock);
router.patch('/permissions/:id/unlock', permission(5), permissionController.lock);

module.exports = router;