const express = require("express");
const router = express.Router();
const accountController = require("../../controllers/client/AccountController");
const cartController = require("../../controllers/client/CartController");
const wishlistController = require("../../controllers/client/WishlistController");
const productController = require("../../controllers/client/ProductController");
const homeController = require("../../controllers/client/HomeController");
const orderController = require("../../controllers/client/OrderController");

const {validate}= require('../../helpers/requests/User');
const { login } = require("../../middleware/client/Auth");
const parse = require("../../middleware/ParseDataMiddleware");

/* GET home page. */
router.get("/", require('../../widgets/slider-client'), homeController.index);
router.post("/subscribe", homeController.subscribe);

/* GET cart page. */
router.get("/cart", login, cartController.cart);
router.post("/cart/addCart", login, cartController.create);
router.patch("/cart/:id/update", login, cartController.update);
router.delete("/cart/:id/destroy", login, cartController.destroy);
router.get("/buynow", login, cartController.buynow);
router.get("/receipt", login, cartController.receipt);

/* GET wishlist page. */
router.get("/wishlist", login, wishlistController.wishlist);
router.post("/wishlist/addWishlist", login, wishlistController.create);
router.delete("/wishlist/:id/destroy", login, wishlistController.destroy);

/* GET pay page. */
router.get("/my-orders", login, orderController.index);
router.get("/order", login, orderController.create);
router.post("/order", login, orderController.store);

/* GET contact page. */
router.get("/contact", (req, res, next) => {
    res.render("contact");
});

/* GET info user page. */
router.get("/user/show", login, accountController.show);
router.put("/user/update", login, parse, validate.validateInfo(), accountController.update);
router.patch("/user/update-password", login, parse, validate.validatePassword(), accountController.updatePassword);

/* GET search product page. */
router.get("/search", homeController.search);

/* GET info product page. */
router.get("/products/:_id", productController.detail);

/* Register user */
router.get("/register", accountController.register);
router.post("/register", validate.validateRegisterUser(), accountController.postRegister);

/* Login user */
router.get("/login", accountController.login);
router.post("/login", validate.validateLogin(), accountController.postLogin);

/* Logout user */
router.get("/logout", accountController.logout);

/* GET list-product page. */
router.get("/:category", productController.listProduct);

module.exports = router;