var telnetModel = require('../models/telnet.model');
const net = require("net");
const {TelnetSocket} = require("telnet-stream");
const { data } = require("jquery");
 //({TelnetSocket} = require("telnet-stream"));
class telnetController {

    getTelnet(req, res){
        res.render('pages/index_telnet');
    }
    telnetDevice(req, res){    
        var ip = req.params.ip;
        //res.send(ip);
        var params = {
            host: ip,
            port: 23,
            shellPrompt: '/ # ',
            timeout: 1500,
            // removeEcho: 4
          }
          var socket = net.createConnection(params, function(){
          });
          
        var tSocket = new TelnetSocket(socket);

        tSocket.on("do", function(option) {
            tSocket.writeWont(option);
        });
        tSocket.on('data', function(buffer) {         
            if (buffer.toString('utf-8').search('login:')!= -1) {
                tSocket.write('admin\r\n');
                // console.log(buffer.toString('utf-8'));
            }
              if(buffer.toString('utf-8').search('Password:')!= -1){
                tSocket.write('admin\r\n');
                // console.log(buffer.toString('utf-8'));
            }
            if(buffer.toString('utf-8').search('>')!= -1){
                tSocket.write('enable\r\n');
                // console.log(buffer.toString('utf-8'));
            }
            if(buffer.toString('utf-8').search('#')!= -1){
                tSocket.write('show port\r\n');
                 tSocket.write('<br>');
                // 
            }
           
           // console.log(buffer.toString('utf-8')); 
             return buffer;
            });
            //tSocket.on("close");

             
            //console.log(typeof buffer.toString('utf-8'))
          
        
    }
    
};
module.exports = new telnetController();