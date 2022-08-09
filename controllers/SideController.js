
const model = require('../modules/Sidemodel');
const xuly =require('../modules/xuly');
class SileController {
  //Get/
  index(req, res) {

    res.render('pages/index');
  }

  search(req, res) {

    res.send('Tim kiem');
  }

  getInfoOLT(req, res) {
    var ip = req.params.ip;
   
    model.getInfoOLT(ip, function (err, data) {
      if (!err) {
        res.send(data);
       
      }
      else {
        res.send({ result: "loi" });
       // console.log('loi');
      }

    });
  }

  getmacOLT(req, res) {
    var data_mac_olt ='';
      
    //var ip = req.params.ip;
    var slid_ip = req.params.slid_ip;

    var chuoiid = slid_ip.substr(0, 9);
    var ip = slid_ip.substr(10, 12);
    var card = xuly.getCard(chuoiid);
    var pon = xuly.getPon(chuoiid);
    var id = xuly.getID(chuoiid);
     let { PythonShell } = require('python-shell');
       let option = {
         mode: "text",
         pythonOptions: ['-u'],
         args: [ip, 'show vlan bridge-port-fdb 1/1/'+card+'/'+pon+'/'+id+'/14/1']
        };
     
       //chay ham Python lay du lieu  
       PythonShell.run('./controllers/TelnetOLT.py', option,    function(err, results) {
         if (err) throw err;
         results.forEach( function(data2) {
             if (data2 == 'r/'){
                 res.write('\n')
             }else{
                
              //   console.log('in lan 1'+data2);
                  data_mac_olt = data_mac_olt+ data2 +'\n';
            
             }
         });

          res.send(data_mac_olt)
          console.log("da hoan thanh lay mac olt IP: "+ ip);
         res.end();
        
       });

       console.log('Dang lay mac olt')
       

  }

  //lay info OLT ALU 
  getInfoOnuOLT(req, res) {
    var data_mac_olt ='';
      
    //var ip = req.params.ip;
    var slid_ip = req.params.slid_ip;

    var chuoiid = slid_ip.substr(0, 9);
    var ip = slid_ip.substr(10, 12);
    var card = xuly.getCard(chuoiid);
    var pon = xuly.getPon(chuoiid);
    var id = xuly.getID(chuoiid);
     let { PythonShell } = require('python-shell');
       let option = {
         mode: "text",
         pythonOptions: ['-u'],
         args: [ip, 'info configure equipment ont interface 1/1/'+card+'/'+pon+'/'+id]
        };
     
       //chay ham Python lay du lieu  
       PythonShell.run('./controllers/TelnetOLT.py', option,    function(err, results) {
         if (err) throw err;
         results.forEach( function(data2) {
             if (data2 == 'r/'){
                 res.write('\n')
             }else{
                
              //   console.log('in lan 1'+data2);
                  data_mac_olt = data_mac_olt+ data2 +'\n';
            
             }
         });

          res.send(data_mac_olt)
          console.log("da hoan thanh lay info Onu olt IP: "+ ip);
         res.end();
        
       });

       console.log('Dang lay mac olt')
       

  }

  getVlanNet(req, res) {
    var slid_ip = req.params.slid_ip;
    
    model.getVlanNet(slid_ip, function (err, data) {
      if (!err) {
        res.send(data);
        console.log(data);

      }
      else {
        res.send({ result: "loi" });
       // console.log('loi');
      }

    });
  }
}

module.exports = new SileController;