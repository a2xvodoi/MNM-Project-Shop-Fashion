const Product = require('../../models/Product');
const Category = require('../../models/Category');
const nodemailer =  require('nodemailer');

module.exports.index = (req, res, next)=>{
        Product.find({}).limit(5).sort({createdAt: 1})
        .then(products=>{
            res.render('client/index', {
                products,
            });
        })
        .catch(next);
};

module.exports.search = (req, res, next) =>{
    const {search_product} = req.query;
    const page = parseInt(req.query.page) || 1;
    const perPage = 8;

    Product.find({name: {$regex: search_product,$options: 'i'  }})
    .skip((perPage * page) - perPage)
    .limit(perPage)
    .then(products => {
        Product.find({name: {$regex: search_product,$options: 'i'  }})
        .count((err, count) => { // count to calculate the number of pages
            if (err) return next(err);
            const data = {
                products: products,
                current: page,
                pages: Math.ceil(count / perPage),
                q: search_product
            };
            res.render('client/list-product', data);
        })
    })
    .catch(next);
};

module.exports.subscribe = (req, res, next) =>{
    const config = {
        host: process.env.MAIL_STMP,
        port: process.env.MAIL_POST,
        secure: true,
        auth: {
            user: process.env.MAIL_USER, 
            pass: process.env.MAIL_PASSWORD
        },
        tls: {
            rejectUnauthorized: false
        }
    };
    var transporter =  nodemailer.createTransport(config);

    var mainOptions = {
        from: process.env.MAIL_USER,
        to: req.body.mail,
        subject: 'Thông báo nhận thông tin từ AVNENDV shop',
        html: '<h1>Bạn đã nhận đăng kí từ shop</h1>'
    }

    transporter.sendMail(mainOptions, function(err, info){
        if (err) {
            res.redirect('/');
        } else {
            res.redirect('/');
        }
    });
};

