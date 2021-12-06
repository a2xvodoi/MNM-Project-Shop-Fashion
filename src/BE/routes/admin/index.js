const express = require('express');
const router = express.Router();
const homeController = require('../../controllers/admin/HomeController');
const productController = require('../../controllers/admin/ProductController');
const categoryController = require('../../controllers/admin/CategoryController');
const userController = require('../../controllers/admin/UserController');

const size_color = require('../../widgets/size_color');

/* GET dashboard page. */
router.get('/', homeController.index);

/* GET dashboard page. */
router.get('/dashboard', homeController.index);

/* GET login page. */
router.get('/login', homeController.login);

/* POST login page. */
router.post('/login', homeController.postLogin);

/* POST logout page. */
router.post('/logout', homeController.logout);

/* GET list product page. */
router.get('/products', productController.index);

/* GET add product page. */
router.get('/products/create', size_color, productController.create);

/* POST store product page. */
router.post('/products/create', productController.store);

/* GET edit product page. */
router.get('/products/:_id/edit', size_color, productController.edit);

/* PUT edit product page. */
router.put('/products/:_id/update', productController.update);

/* POST upload file page. */
router.post('/products/:_id/upload/:type', productController.upload);

/* GET detail product page. */
router.get('/products/:id', productController.detail);

/* DELETE delete product page. */
router.delete('/products/:_id/destroy', productController.destroy);

/* GET list category page. */
router.get('/categories', categoryController.index);

/* POST store category page. */
router.post('/categories', categoryController.store);

/* PATCH update category page. */
router.patch('/categories/:_id/update', categoryController.update);

/* DELETE delete category page. */
router.delete('/categories/:_id/destroy', categoryController.destroy);

/* GET list user page. */
router.get('/users', userController.index);

/* DELETE delete user page. */
router.delete('/users/:_id/destroy', userController.destroy);
/* Get store user page. */
router.get('/users/create', userController.create);
/* POST create user page. */
router.post('/users/create', userController.store);
/* GET edit user page. */
router.get('/users/:_id/edit', userController.edit); 
/* PUT update user page. */
router.put('/users/:_id/update', userController.update);
/* get view user page. */
router.get('/users/:_id/view', userController.view);

module.exports = router;