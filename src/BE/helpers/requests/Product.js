const {check} = require('express-validator');

const Product = require("../../models/Product");

const checkExistName = async (value) => {
	const rs = await Product.find({name : value}).count();
	if (rs) {
		throw new Error('Tên sản phẩm đã tồn tại');
	}
}

const validateProduct = () => {
  return [ 
    check('data.name').trim(),
    check('data.name', 'Tên sản phẩm không được để trống').not().isEmpty(),
    check('data.name', 'Tên sản phẩm phải ít nhất 10 kí tự').isLength({ min: 10 }),
    check('data.name').custom(checkExistName),
    check('data.price').trim(),
    check('data.price', 'Giá không được để trống').not().isEmpty(),
    check('data.category').trim(),
    check('data.category', 'Danh mục không được để trống').not().isEmpty(),
  ]; 
};

const validate = {
  validateProduct: validateProduct,
};

module.exports = {validate};