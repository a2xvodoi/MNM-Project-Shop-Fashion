const express = require("express");
const router = express.Router();
const accountController = require("../../controllers/client/AccountController");
const cartController = require("../../controllers/client/CartController");
const wishlistController = require("../../controllers/client/WishlistController");
const productController = require("../../controllers/client/ProductController");
const homeController = require("../../controllers/client/HomeController");
const orderController = require("../../controllers/client/OrderController");

const {login} = require('../../middleware/client/Auth');

/* GET home page. */
router.get("/", homeController.index);

/* GET cart page. */
router.get('/cart', login, cartController.cart);
router.post('/cart/addCart', login, cartController.create);
router.patch('/cart/:id/update', login, cartController.update);
router.delete('/cart/:id/destroy', login, cartController.destroy);

/* GET wishlist page. */
router.get("/wishlist", login, wishlistController.wishlist);
router.post('/wishlist/addWishlist', login, wishlistController.create);
router.delete('/wishlist/:id/destroy', login, wishlistController.destroy);

/* GET pay page. */
router.get("/order", login, orderController.create);
router.post("/order", login, orderController.store);

/* GET contact page. */
router.get("/contact", (req, res, next) => {
    res.render("contact");
});

/* GET info user page. */
router.get("/user/show", login, accountController.show);
router.put("/user/update", login, accountController.update);
router.patch("/user/update-password", login, accountController.updatePassword);

/* GET search product page. */
router.get("/search", homeController.search);

/* GET info product page. */
router.get("/products/:_id", productController.detail);

/* Register user */
router.get("/register", accountController.register);
router.post("/register", accountController.postRegister);

/* Login user */
router.get("/login", accountController.login);
router.post("/login", accountController.postLogin);

/* Logout user */
router.get("/logout", accountController.logout);

/* GET list-product page. */
router.get("/:category", homeController.listProduct);

module.exports = router;