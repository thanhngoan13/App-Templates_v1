const net = require("net");
const {TelnetSocket} = require("telnet-stream");
const http = require('http');
const https = require('https');
const { data } = require("jquery");
const { ConnectionPool } = require("mssql");
class telnetModel {
    async getTelnetDevice(ip,result) {
      function sleep(ms) {
        return new Promise((resolve) => {
          setTimeout(resolve, ms);
        });
      }
    var params = {
      host: ip,
      port: 23,
      shellPrompt: '/ # ',
      timeout: 1500,
      // removeEcho: 4
    }
    var socket = net.createConnection(params, function(){
      result(null, 'connected!!!');
    });
    var tSocket = new TelnetSocket(socket);

        tSocket.on("do", function(option) {
            tSocket.writeWont(option);
        });

        tSocket.on('data', function(buffer) {    
          var i=0      
          if (buffer.toString('utf-8').search(':')!= -1) {
            i++;
            console.log(i);
            if(i == 1){
              tSocket.write('admin\r\n','utf-8');
              i++;
            console.log(i);
            }
            if(i == 2){
              tSocket.write('admin\r\n','utf-8');
              i++;
            console.log(i);
            }
            if(i == 3){
              tSocket.write('enable\r\n','utf-8');
              i++;
            console.log(i);
            }
          } 
          result(null, buffer.toString('utf-8'));
        });  
        
  /*      tSocket.write('admin\r\n','utf-8');
          tSocket.write('admin\r\n','utf-8');
          tSocket.write('en\r\n','utf-8'); */

      }

};

module.exports = new telnetModel();