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

/* process.stdin.on("readable",function(){
  var d= process.stdin.read();
  if(d == "q\n"){
    process.stdin.pause();
  } else if(d){
    console.log(d);
  }
});
process.stdin.setEncoding("utf-8");
process.stdin.resume(); */
/* var TelnetSocket, net, socket, tSocket;

({TelnetSocket} = require("telnet-stream"));
net = require("net");
socket = net.createConnection(23, "10.95.5.10");
tSocket = new TelnetSocket(socket); */

/*  tSocket.on("close", function() {
  return process.exit();
}); */

/* tSocket.on("data", function(buffer) {
  return process.stdout.write(buffer.toString("utf8"));
}); */

// tSocket.on("do", function(option) {
//   console.log(tSocket.writeWont(option))
//   return tSocket.writeWont(option);
// }); 


/* tSocket.on("will", function(option) {
  return tSocket.writeDont(option);
}); */


/* process.stdin.on("data", function(buffer) {
  return tSocket.write(buffer.toString("utf8"));
}); */

route(app, process);
server.listen(process.env.PORT || PORT);
console.log('Server nodejs chạy tại địa chỉ: ' + ip.address() + ':' + PORT);
