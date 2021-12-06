module.exports =(req, res, next) => {
    if (req.session.customer) {
        const pathLogin = req._parsedOriginalUrl.pathname;
        if ((pathLogin === '/login')) {
            res.redirect('/');
        }

        res.locals.customer = req.session.customer;
        next();
    } else {
        res.locals.customer = false;
        next();
    }
}
