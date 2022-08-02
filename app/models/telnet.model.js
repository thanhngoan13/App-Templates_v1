const net = require("net");
const {TelnetSocket} = require("telnet-client");
//const {Telnet} = require("telnet-stream");
const http = require('http');
const https = require('https');
const { data } = require("jquery");
const { ConnectionPool } = require("mssql");
var databuffer = '';
class telnetModel {
  async getTelnetDevice(ip,result) {
        var params = {
          host: ip,
          port: 23,
          shellPrompt: '/ # ',
          timeout: 1500,
          // removeEcho: 4
        }
        var client = new net.Socket();
        //  var client = net.createConnection(params, function(){
        //   result('connected!!!');
        // });
        // client.on('connect', function(){
        //   client.write('admin\r\n')
        //   client.write('admin\r\n')
        // });
        client.connect(params, function(){
          console.log('Connected!!!');
          client.write('admin\r\n')
          client.write('admin\r\n')
        });
        client.on('data', function(data) {
          console.log('Received: '+ data.toString())
          // var datos = []
          // datos.push(data)
          // datos.push(data.toJSON)
        //  console.log(datos)
          //client.destroy(); // kill client after server's response
        });
        client.on('close', function() {
          console.log('Connection closed');
        });
        //  let connection = new TelnetSocket(socket);   
/*         connection.on("data", function() {
           process.stdout.write(buffer.toString("utf8"));
        });
        process.stdin.on("data", function(buffer) {
           connection.write(buffer.toString("utf8"));
        }); */

/*         connection.on('data', function(buffer) {
          
           while (buffer.toString('utf-8').search(':')!= -1) {
            console.log(buffer.toString('utf-8').search(':'));
          } 
          console.log('Received:' +buffer.toString('utf-8'));
          connection.destroy();
        }); */ 
/*         tSocket.write('admin\r\n','utf-8');
        tSocket.write('admin\r\n','utf-8');
        tSocket.write('en\r\n','utf-8'); */

    }

};
module.exports = new telnetModel();