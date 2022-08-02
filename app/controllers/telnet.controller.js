var telnetModel = require('../models/telnet.model');
 ({TelnetSocket} = require("telnet-stream"));
class telnetController {

    getTelnet(req, res){
        res.render('pages/index_telnet');
    }
    telnetDevice(req, res){    
        var ip = req.params.ip;
        telnetModel.getTelnetDevice(ip, function (err, data) {
            console.log(data);
            res.send(data);
           if (!err) {
                res.send(data);  
                console.log(data);
            } else {
                res.send({ result: 'loi' });
                 console.log('loi');
            }   
        })
    }
};
module.exports = new telnetController();