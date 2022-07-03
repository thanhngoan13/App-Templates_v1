//const {conn, sql} = require('../../connect');
var model = require('../models/khaibaothuebao.model');
class khaibaothuebaoController {
    //Get/
    index(req, res) {
        res.render('pages/index_khaibaothuebao');
    }
    sotrucca(req, res) {
        res.render('pages/index_sotrucca');
    }
    getInfoOLT(req, res) {
        var ip = req.params.ip;

        model.getInfoOLT(ip, function (err, data) {
            if (!err) {
                res.send(data);
                // console.log(data);
            } else {
                res.send({ result: 'loi' });
                // console.log('loi');
            }
        });
    }

    getVlanNet(req, res) {
        var slid_ip = req.params.slid_ip;

        model.getVlanNet(slid_ip, function (err, data) {
            if (!err) {
                res.send(data);
                console.log(data);
            } else {
                res.send({ result: 'Lỗi' });
            }
        });
    }
}
module.exports = new khaibaothuebaoController();
/* exports.getStudentList = async function(req, res){
    model.getStudentAll(function(err, data){
       res.send({result: data, error: err});
    });
};

exports.getStudentById = async function(req, res){
    model.getStudentOne(req.params.id, function(err, data){
        res.send({result: data, error: err});
    });
};
exports.getPages =  function(req, res){
       res.render('pages/index');  
};
exports.getVlanVodOlt = async function(req, res){
    var ip = req.params.ip;
    var pool = await conn;
    var sqlString = "SELECT * FROM OLT WHERE IP = @varIP";
    return await pool.request()
    .input('varIP',sql.NVarChar, ip)
    .query(sqlString, function(err, data){
        if(data.recordset.length > 0 ){
            res.send({result: data.recordset[0].VlanVod});
        }
        else {
            res.send({result: null});
        } 
    }); 
};
exports.postStudent = async function(req, res){
    model.createStudent(req.body, function(err, data){
        res.send({result: data, error: err});
    });  
};
exports.deleteStudent = async function(req, res){
    model.deleteStudent(req.params.id, function(err, data){
        res.send({result: data, error: err});
    });
};
exports.putStudent = async function(req, res){
    var pool = await conn;
    var sqlString = "UPDATE Students SET Name = @name, Email = @email, Phone = @phone WHERE Id = @id" ;
    return await pool.request()
    .input('email', sql.VarChar, req.body.Email)
    .input('name', sql.NVarChar, req.body.Name)
    .input('phone', sql.VarChar, req.body.Phone)
    .input('id', sql.Int, req.body.Id)
    .query(sqlString, function(err, data){
      res.send({result: req.body})
    }); 
}

exports.sotrucca = function(req, res){
    res.render('pages/sotrucca'); 
};
exports.getInfoOlt = async function(req, res){
    var slid_ip = req.params.slid_ip;
    model.getInfoOlts(slid_ip,function(err, data){
       res.send({result: data, error: err});
    });
}; */
