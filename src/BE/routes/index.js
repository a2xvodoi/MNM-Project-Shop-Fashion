
const indexRoute = require('./client');
const indexAdRoute = require('./admin/index');

function router(app){
    //Pages Client
    app.use('/', indexRoute);

    //Pages Admin
    app.use('/admin', indexAdRoute);
}

module.exports = router;
