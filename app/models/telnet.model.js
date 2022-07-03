const net = require("net");
const {TelnetSocket} = require("telnet-stream");
const http = require('http');
const https = require('https');
class telnetModel {
  async getTelnetDevice(ip,result) {
        var socket = net.createConnection(23, ip);
        var tSocket = new TelnetSocket(socket);  
        tSocket.on("do", function(option){
          return tSocket.writeWont(option);
        })
        tSocket.on("data", function(buffer) {
          result(buffer.toString('utf-8'))

         // console.log(tSocket)
/*             if(timeout =0){
            tSocket.write('admin\r\n');
          }
          console.log(buffer.toString("utf8"))
          timeout++; */
        });
    }

};
module.exports = new telnetModel();