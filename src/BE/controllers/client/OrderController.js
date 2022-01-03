const Cart = require('../../models/Cart');
const Order = require('../../models/Order');
const crypto = require('crypto');
const https = require('https');

const configMomo = (order, total, rq, res) => {
    const partnerCode = process.env.PARTNER_CODE;
    const accessKey = process.env.ACCESS_KEY;
    const secretkey = process.env.SECRET_KEY;
    const requestId = partnerCode + new Date().getTime();
    const requestType = process.env.REQUEST_TYPE;
    const extraData = ""; //pass empty value if your merchant does not have stores
    const orderId = order._id;
    const orderInfo = `Thanh toán đơn hàng ${order._id} với momo`;
    const redirectUrl = "http://localhost:3000/my-orders";
    const ipnUrl = "https://test-payment.momo.vn/gw_payment/transactionProcessor";
    const amount = total + 10000;
    //before sign HMAC SHA256 with format
    //accessKey=$accessKey&amount=$amount&extraData=$extraData&ipnUrl=$ipnUrl&orderId=$orderId&orderInfo=$orderInfo&partnerCode=$partnerCode&redirectUrl=$redirectUrl&requestId=$requestId&requestType=$requestType
    const rawSignature = "accessKey="+accessKey+"&amount=" + amount+"&extraData=" + extraData+"&ipnUrl=" + ipnUrl+"&orderId=" + orderId+"&orderInfo=" + orderInfo+"&partnerCode=" + partnerCode +"&redirectUrl=" + redirectUrl+"&requestId=" + requestId+"&requestType=" + requestType;

    const signature = crypto.createHmac('sha256', secretkey)
    .update(rawSignature)
    .digest('hex');

    //json object send to MoMo endpoint
    const requestBody = JSON.stringify({
        partnerCode : partnerCode,
        accessKey : accessKey,
        requestId : requestId,
        amount : amount,
        orderId : orderId,
        orderInfo : orderInfo,
        redirectUrl : redirectUrl,
        ipnUrl : ipnUrl,
        extraData : extraData,
        requestType : requestType,
        signature : signature,
        lang: 'en'
    });

    //Create the HTTPS objects
    const options = {
        hostname: 'test-payment.momo.vn',
        port: 443,
        path: '/v2/gateway/api/create',
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'Content-Length': Buffer.byteLength(requestBody)
        }
    }

    //Send the request and get the response
    const req = https.request(options, rs => {
        rs.setEncoding('utf8');
        rs.on('data', (body) => {
            rq.session.signature = signature;
            rq.session.orderId = orderId;
            res.redirect(JSON.parse(body).payUrl);
        });
        rs.on('end', () => {
            console.log('No more data in response.');
        });
    })
    req.write(requestBody);
    req.end();
}

// GET /my-orders
module.exports.index = async(req, res, next) => {
    if (req.query.orderId == req.session.orderId && req.query.resultCode == 0) {
        const order = await Order.findOne({_id: req.query.orderId});
        order.status = 2;
        order.save();
    }
    const userId = req.session.customer._id;
    const orders = await Order.find({userId: userId}).populate('products.productId').sort({updatedAt: -1});
    res.render("client/my-orders", {orders: orders});
}

// GET order /order
module.exports.create = async(req, res, next) => {
    const userId = req.session.customer._id;
    Cart.findOne({ userId }).populate('products.productId')
    .then(cart => {
        const data = {
            cartProducts: cart ? cart.products: null,
            user: req.session.customer,
        }
        res.render('client/order', data);
    })
    .catch(next);
}

// POST order /order
module.exports.store = async (req, res, next) => {
    const session = await Order.startSession();
    session.startTransaction();
    try {
        const opts = { session, new: true };

        const userId = req.session.customer._id;
        const { full_name, email, phone, address, payment } = req.body;
        const productOrder = await Cart.findOne({ userId }).populate('products.productId');
        if (productOrder.products.length) {
            const order = new Order({
                'userId': userId,
                'full_name': full_name,
                'email': email,
                'phone': phone,
                'address': address,
                'typePay': payment,
                'products': productOrder.products,
            });
            let total = 0;
            productOrder.products.forEach(product => {
                total += product.productId.price * product.quantity;
            });
            if (await order.save(opts)) {
                productOrder.products = [];
                await productOrder.save(opts);
                await session.commitTransaction();
                session.endSession();
                if (order.typePay === "MOMO") {
                    configMomo(order, total, req, res);
                }else{
                    res.redirect('/');
                    return;
                }
            }    
        } else {
            throw new Error('Đặt hàng không thành công');
        }
    } catch (error) {
        await session.abortTransaction();
        session.endSession();
        next(error);
    }
}
