const PORT = 3000;
const http = require('http');
const express = require('express');
const morgan = require('morgan');
const bodyParser = require('body-parser');
const { devNull } = require('os');
const ip = require('ip');
const app = express();
const server = http.Server(app);
const path = require('path');
const route = require('./app/routes');
const { data } = require('jquery');
app.use(morgan('combined')); //Hiển thị logger HTML
app.set('view engine', 'ejs');
app.use(bodyParser.json());
app.use(express.json()); //
app.use(express.static('node_modules/jquery'));
app.use(express.static('node_modules/jquery-validation'));
app.use(express.static('sql'));
app.use(express.static('views'));
app.use(express.static('public'));

route(app);
server.listen(process.env.PORT || PORT);
console.log('Server nodejs chạy tại địa chỉ: ' + ip.address() + ':' + PORT);
