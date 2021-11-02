const express = require('express');
const router = express.Router();
const homeController = require('../../controllers/admin/HomeController');
const productController = require('../../controllers/admin/ProductController');
const categoryController = require('../../controllers/admin/CategoryController');

/* GET dashboard page. */
router.get('/', homeController.index);

/* GET dashboard page. */
router.get('/dashboard',(req, res, next)=>{
  if (req.isAuthenticated) {
    next()
  }
  res.redirect('/admin/login');
}, homeController.index);

/* GET login page. */
router.get('/login', homeController.login);

/* POST login page. */
router.post('/login', homeController.postLogin);

/* POST logout page. */
router.post('/logout', homeController.logout);

/* GET list product page. */
router.get('/products', productController.index);

/* GET add product page. */
router.get('/products/create', productController.create);

/* POST store product page. */
router.post('/products/create', productController.store);

/* GET edit product page. */
router.get('/products/:_id/edit', productController.edit);

/* PUT edit product page. */
router.put('/products/:_id/update', productController.update);

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

module.exports = router;