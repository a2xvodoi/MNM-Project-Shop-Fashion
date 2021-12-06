const createError = require('http-errors');
const indexRoute = require('./client');
const indexAdRoute = require('./admin/index');

const passport = require('passport');

function router(app){
    //Pages Client
    app.use('/', require('../widgets/category-client'), require('../middleware/client/Auth').identity, indexRoute);

    //Pages Admin
    app.use('/admin', (req, res, next) => {
        res.locals.user = req.user;
        next();
    }, 
    passport.initialize(), passport.session(), 
    require('../widgets/links'), require('../middleware/admin/Alert'), 
    // require('../middleware/admin/Auth').requiredLogin,
    indexAdRoute);

    // catch 404 and forward to error handler
    app.use(function(req, res, next) {
        next(createError(404));
    });
  
    // error handler
    app.use(function(err, req, res, next) {
        // set locals, only providing error in development
        res.locals.message = err.message;
        res.locals.error = req.app.get('env') === 'development' ? err : {};
    
        // render the error page
        res.status(err.status || 500);
        res.render('error');
    });
}

module.exports = router;
