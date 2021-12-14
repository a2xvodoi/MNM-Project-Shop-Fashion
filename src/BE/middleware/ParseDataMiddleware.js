module.exports = (req, res, next) => {
    req.body.data = JSON.parse(req.body.data);
    next();
};
