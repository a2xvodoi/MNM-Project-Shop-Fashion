const Product = require('../../models/Product');
const nodemailer =  require('nodemailer');

module.exports.index = (req, res, next)=>{
    Product.find({}).limit(8).sort({updatedAt: -1})
    .then(products=>{
        res.render('client/index', {
            products,
        });
    })
    .catch(next);
};

module.exports.search = (req, res, next) =>{
    const {q} = req.query;
    const page = parseInt(req.query.page) || 1;
    const perPage = 8;

    const sort = {};
    switch (req.query.sort) {
        case 'price-ascending':
            sort.price = 1;
            break;
    
        case 'price-descending':
            sort.price = -1;
            break;
    
        case 'title-ascending':
            sort.name = 1;
            break;
    
        case 'title-descending':
            sort.name = -1;
            break;
    
        default:
            sort.updatedAt = -1;
            break;
    }

    Product.find({name: {$regex: q,$options: 'i'  }})
    .sort(sort)
    .skip((perPage * page) - perPage)
    .limit(perPage)
    .then(products => {
        Product.find({name: {$regex: q,$options: 'i'  }})
        .count((err, count) => { // count to calculate the number of pages
            if (err) return next(err);
            const data = {
                products: products,
                current: page,
                pages: Math.ceil(count / perPage),
                q: q,
                sort: req.query.sort
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
        subject: 'Th??ng b??o nh???n th??ng tin t??? AVNENDV shop',
        html: '<h1>B???n ???? nh???n ????ng k?? t??? shop AVNENDV</h1>' + 
            "</br><h4>C???m ??n b???n ???? quan t??m ?????n shop c???a ch??ng t??i .Th?? g???i n??y ????? x??c nh???n cho vi???c ????ng k?? nh???n th??ng tin c???a b???n  </h4>"+
            "</br> <h4> Th??ng tin li??n h???  </h4>"+
            "</br> <h4><strong> S??? ??i???n tho???i: </strong>  0336637633  </h4>"+
            "</br><span><h4> <strong> Fanpage: </strong> https://www.facebook.com/profile.php?id=100075157174164 </h4> </br>"+
            "</br><h4> <strong> Website c???a ch??ng t??i :</h4> </strong><h5> https://avnendv.herokuapp.com/ </h5> </br>",
    }

    transporter.sendMail(mainOptions, function(err, info){
        if (err) {
            res.redirect('/');
        } else {
            res.redirect('/');
        }
    });
};

