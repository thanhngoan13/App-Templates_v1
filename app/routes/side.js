// const express = require('express');
// const router = express.Router();
// var khaibaothuebaoController = require('../controllers/khaibaothuebao.controller');
// var telnetController = require('../controllers/telnet.controller');
// router.get('/getInfoOLT/:ip', khaibaothuebaoController.getInfoOLT);
// // lấy VLANVOD
// router.get('/getVlanNet/:slid_ip', khaibaothuebaoController.getVlanNet);
// //render pages
// // get telnet
// router.get('/gettelnetdevice/:ip', telnetController.telnetDevice);
// router.use('/sotrucca', khaibaothuebaoController.sotrucca);
// router.use('/telnet', telnetController.getTelnet);
// router.use('/', khaibaothuebaoController.index);
// module.exports = router;

module.exports.default_func = function(app, process) {
    var khaibaothuebaoController = require('../controllers/khaibaothuebao.controller');
    var telnetController = require('../controllers/telnet.controller');
    app.get('/getInfoOLT/:ip', khaibaothuebaoController.getInfoOLT);
    // lấy VLANVOD
    app.get('/getVlanNet/:slid_ip', khaibaothuebaoController.getVlanNet);
    app.get('/gettelnetdevice/:ip', telnetController.telnetDevice);
    app.use('/sotrucca', khaibaothuebaoController.sotrucca);
    app.use('/telnet', telnetController.getTelnet);
    app.use('/', khaibaothuebaoController.index);
}

