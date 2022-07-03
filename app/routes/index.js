const { default_func } = require('./side');

function route(app, process) {
    // app.use('/', sideRoute);
    // console.log("process HEre", app)
    default_func(app, process);
}

module.exports = route;
