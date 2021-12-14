const {check} = require('express-validator');
const User = require("../../models/User");

const checkExistUserName = async (value, {req}) => {
	const filter = {
		user_name : value
	}
	if (typeof req.session.customer !=='undefined' && req.session.customer._id) {
		filter._id = {
			$ne: req.session.customer._id
		}
	}
	const rs = await User.find(filter).count();
	if (rs) {
		throw new Error('Tên đăng nhập đã tồn tại');
	}
};

const checkExistEmail = async (value, {req}) => {
	const filter = {
		email : value
	}
	if (typeof req.session.customer !=='undefined' && req.session.customer._id) {
		filter._id = {
			$ne: req.session.customer._id
		}
	}
	const rs = await User.find(filter).count();
	if (rs) {
		throw new Error('Email đã tồn tại');
	}
};

const checkExistPhone = async (value, {req}) => {
	const filter = {
		phone : value
	}
	if (typeof req.session.customer !=='undefined' && req.session.customer._id) {
		filter._id = {
			$ne: req.session.customer._id
		}
	}
	const rs = await User.find(filter).count();
	if (rs) {
		throw new Error('Số điện thoại đã tồn tại');
	}
};

const validateRegisterUser = () => {
  return [ 
    check('user_name').trim(),
    check('user_name', 'Tên đăng nhập không được để trống').not().isEmpty(),
    check('user_name', 'Tên đăng nhập không được chứa kí tự đặc biệt').isAlphanumeric(),
    check('user_name', 'Tên đăng nhập phải ít nhất 4 kí tự').isLength({ min: 4 }),
    check('user_name').custom(checkExistUserName),
    check('password', 'Mật khẩu phải có ít nhất 6 kí tự').isLength({ min: 6 }),
    check('full_name').trim(),
    check('full_name', 'Họ tên không được để trống').not().isEmpty(),
    check('full_name', 'Họ tên không được chứa kí tự đặc biệt').isAlphanumeric(),
    check('full_name', 'Họ tên phải ít nhất 6 kí tự').isLength({ min: 6 }),
    check('phone', 'Số điện thoại không được để trống').not().isEmpty(),
    check('phone', 'Số điên thoại không hợp lệ').matches(/^([0-9]+)/),
	check('phone').custom(checkExistPhone),
    check('birthday', 'Ngày sinh không đúng định dạng').isISO8601('yyyy-mm-dd'),
    check('birthday', 'Ngày sinh không được để trống').not().isEmpty(),
    check('email', 'Email không được để trống').not().isEmpty(),
    check('email', 'Email không đúng định dạng').isEmail(),
	check('email').custom(checkExistEmail),
    check('address', 'Địa không được để trống').not().isEmpty(),
  ]; 
};

const validateLogin = () => {
  return [ 
    check('user_name', 'Tên đăng nhập không được để trống').not().isEmpty(),
    check('password', 'Mật khẩu không được để trống').not().isEmpty(),
  ]; 
};

const validateInfo = () => {
    return [ 
      check('data.user_name').trim(),
      check('data.user_name', 'Tên đăng nhập không được để trống').not().isEmpty(),
      check('data.user_name', 'Tên đăng nhập không được chứa kí tự đặc biệt').isAlphanumeric(),
      check('data.user_name', 'Tên đăng nhập phải ít nhất 4 kí tự').isLength({ min: 4 }),
	  check('data.user_name').custom(checkExistUserName),
      check('data.full_name').trim(),
      check('data.full_name', 'Họ tên không được để trống').not().isEmpty(),
      check('data.full_name', 'Họ tên không được chứa kí tự đặc biệt').isAlphanumeric(),
      check('data.full_name', 'Họ tên phải ít nhất 6 kí tự').isLength({ min: 6 }),
      check('data.phone', 'Số điện thoại không được để trống').not().isEmpty(),
      check('data.phone', 'Số điên thoại không hợp lệ').matches(/^([+0-9]+)/),
	  check('data.phone').custom(checkExistPhone),
      check('data.birthday', 'Ngày sinh không đúng định dạng').isISO8601('yyyy-mm-dd'),
      check('data.birthday', 'Ngày sinh không được để trống').not().isEmpty(),
      check('data.email', 'Email không được để trống').not().isEmpty(),
      check('data.email', 'Email không đúng định dạng').isEmail(),
	  check('data.email').custom(checkExistEmail),
      check('data.address', 'Địa không được để trống').not().isEmpty(),
    ]; 
};

const validatePassword = () => {
    return [
		check('data.passwordOld', 'Mật khẩu cũ không được để trống').not().isEmpty(),
		check('data.passwordNew', 'Mật khẩu mới phải có ít nhất 6 kí tự').isLength({ min: 6 }),
    ]; 
};

const validate = {
  validateRegisterUser: validateRegisterUser,
  validateLogin: validateLogin,
  validateInfo: validateInfo,
  validatePassword: validatePassword,
};

module.exports = {validate};