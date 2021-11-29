const Product = require('../../models/Product');
const User = require('../../models/User');
const Cart = require('../../models/Cart');

module.exports.cart = (req, res, next) => {
	const userId = "FGGx4VnQs";
	Cart.findOne({
			userId
		}).populate('products.productId')
		.then(cart => {
			const data = {
				products: cart.products,
			}
			res.render('client/cart', data);
		})
		.catch(next);
}

module.exports.create = async (req, res) => {
	const {
		productId,
		size,
		color,
		quantity
	} = JSON.parse(req.body.data);

	const userId = "FGGx4VnQs"; //TODO: the logged in user id

	try {
		let cart = await Cart.findOne({
			userId
		});

		if (cart) {
			//cart exists for user
			let itemIndex = cart.products.findIndex(p => p.productId == productId && p.size == size && p.color == color);
			if (itemIndex > -1) {
				//product exists in the cart, update the quantity
				let productItem = cart.products[itemIndex];
				productItem.quantity = quantity;
				cart.products[itemIndex] = productItem;
			} else {
				//product does not exists in cart, add new item
				cart.products.push({
					productId,
					color,
					size,
					quantity
				});
			}
			cart = await cart.save();
			return res.status(201).send(cart);
		} else {
			//no cart for user, create new cart
			const newCart = await Cart.create({
				userId,
				products: [{
					productId,
					color,
					size,
					quantity
				}]
			});

			return res.status(201).send(newCart);
		}
	} catch (err) {
		console.log(err);
		res.status(500).send("Something went wrong");
	}
};

module.exports.update = async (req, res, next) => {
	let updateCart = JSON.parse(req.body.data);
	const userId = "FGGx4VnQs"; //TODO: the logged in user id

	try {
		let cart = await Cart.findOne({
			userId
		});

		if (cart) {
			//cart exists for user
			let itemIndex = cart.products.findIndex(p => p._id == req.params.id);
			if (itemIndex > -1) {
				//product exists in the cart, update the quantity
				let productItem = cart.products[itemIndex];
				productItem.quantity = updateCart.quantity;
				cart.products[itemIndex] = productItem;
			} else {
				//product does not exists in cart
				return res.json('');
			}
			cart = await cart.save();
			return res.status(201).send(cart);
		} else {
			return res.status(201).send('');
		}
	} catch (err) {
		console.log(err);
		res.status(500).send("Something went wrong");
	}
}

module.exports.destroy = async (req, res, next) => {
	const userId = "FGGx4VnQs"; //TODO: the logged in user id

	try {
		let cart = await Cart.findOne({
			userId
		});

		if (cart) {
			//cart exists for user
			let itemIndex = cart.products.findIndex(p => p._id == req.params.id);
			if (itemIndex > -1) {
				cart.products.splice(itemIndex,1);
			} else {
				//product does not exists in cart
				return res.json('');
			}
			cart = await cart.save();
			return res.json({status: 200});
		} else {
			return res.status(201).send('');
		}
	} catch (err) {
		console.log(err);
		res.status(500).send("Something went wrong");
	}
}

// module.exports.deleteAll = (req, res, next) =>{
//     let status = false;
//     if (req.session.cart) {
//         cartMiddleware.cleanCart(req);
//         status = true;
//     }
//     res.json({status: status});
// }
// GET order /dat-hang

module.exports.order = async (req, res, next) => {
	const q = await User.findOne({
		tenDangNhap: req.session.name
	});
	res.render('client/cart/order', {
		title: 'Đặt hàng',
		session: req.session,
	})
}

// POST order /dat-hang

module.exports.postOrder = (req, res, next) => {
	const detailOrder = new DetailOrder({
		nguoiNhan: req.body.nguoiNhan,
		diaChiNhan: req.body.diaChiNhan,
		status: 'chưa giao',
		products: req.session.cart.products,
	});
	detailOrder.save()
		.then(() => res.redirect('/'))
		.catch(next);
}