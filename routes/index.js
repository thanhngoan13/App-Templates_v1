const   sideRoute  = require('./side');
const   trungtamRoute  = require('./trungtam-route');


function route(app) {
    app.use('/trungtam',trungtamRoute);
    app.use('/',sideRoute);

}

module.exports =route;