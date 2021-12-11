const express = require("express");
const router = express.Router();
const accountController = require("../../controllers/client/AccountController");
const cartController = require("../../controllers/client/CartController");
const wishlistController = require("../../controllers/client/WishlistController");
const productController = require("../../controllers/client/ProductController");
const homeController = require("../../controllers/client/HomeController");
const orderController = require("../../controllers/client/OrderController");
const nodemailer =  require('nodemailer');


const { login } = require("../../middleware/client/Auth");

/* GET home page. */
router.get("/", homeController.index);

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
router.get("/:category", productController.listProduct);




router.get('/', function(req, res) {
    res.render('/index', {
        mess: req.flash('mess')
    });
});
router.post('/index', function(req, res) {
    //Tiến hành gửi mail, nếu có gì đó bạn có thể xử lý trước khi gửi mail
    var transporter =  nodemailer.createTransport({ // config mail server
        host: 'smtp.gmail.com',
        port: 465,
        secure: true,
        auth: {
            user: 'avnendv@gmail.com', //Tài khoản gmail vừa tạo
            pass: 'Abc123!@#' //Mật khẩu tài khoản gmail vừa tạo
        },
        tls: {
            // do not fail on invalid certs
            rejectUnauthorized: false
        }
    });
    var content = '';
    content += `
        <div style="padding: 10px; background-color: #003375">
            <div style="padding: 10px; background-color: white;">
                <h4 style="color: #0085ff">Gửi mail test nhóm</h4>
                <span style="color: black">Đây là mailcho vương</span>
            </div>
        </div>
    `;
    var mainOptions = { // thiết lập đối tượng, nội dung gửi mail
        from: 'NQH-Test nodemailer',
        to: req.body.mail,
        subject: 'Test Nodemailer',
        text: 'Your text is here',//Thường thi mình không dùng cái này thay vào đó mình sử dụng html để dễ edit hơn
        html: content //Nội dung html mình đã tạo trên kia :))
    }
    transporter.sendMail(mainOptions, function(err, info){
        if (err) {
            console.log(err);
            req.flash('mess', 'Lỗi gửi mail: '+err); //Gửi thông báo đến người dùng
            res.redirect('/index');
        } else {
            console.log('Message sent: ' +  info.response);
            req.flash('mess', 'Một email đã được gửi đến tài khoản của bạn'); //Gửi thông báo đến người dùng
            res.redirect('/index');
        }
    });
});

module.exports = router;