const { conn, sql } = require('../../connectdb');
const xuly = require('./xuly');
class khaibaothuebaoModel {
    /* this.getStudentAll = async function(result){
    var pool = await conn;
    var sqlString = "SELECT * FROM Students";
    return await pool.request()
    .query(sqlString, function(err, data){
       if(data.recordset.length > 0){
        result(null, data.recordset);
       } else {
        result(true, null);
       }
    });
};
this.getStudentOne = async function(id, result){
    //var id = req.params.id;
    var pool = await conn;
    var sqlString = "SELECT * FROM Students WHERE Id = @varId";
    return await pool.request()
    .input('varId',sql.Int, id)
    .query(sqlString, function(err, data){
        if(data.recordset.length > 0 ){
            result(null, data.recordset[0]);
        }
        else {
            result(true, null);
        }
    }); 
};
this.createStudent = async function(newData, result){
    var pool = await conn;
    var sqlString = "INSERT INTO Students (Name, Email, Phone) VALUES(@name,@email,@phone)" ;
    return await pool.request()
    .input('name', sql.NVarChar, newData.Name)
    .input('email', sql.VarChar, newData.Email)
    .input('phone', sql.VarChar, newData.Phone)
    .query(sqlString, function(err, data){
    if(err){
        result(true, null);
    } else {
        result(null, newData);
        }
    }); 
};
this.updateStudent = async function(newData, result){
    var pool = await conn;
    var sqlString = "UPDATE Students SET Name = @name, Email = @email, Phone = @phone WHERE Id = @id" ;
    return await pool.request()
    .input('email', sql.VarChar, result.Email)
    .input('name', sql.NVarChar, result.Name)
    .input('phone', sql.VarChar, result.Phone)
    .input('id', sql.Int, result.Id)
    .query(sqlString, function(err, data){
      if(err){
        result(true, null);
      } else {
        result(null, newData);
      }
    }); 
}
this.deleteStudent = async function(id, result){
    var pool = await conn;
    var sqlString = "DELETE FROM Students WHERE Id = @varId";
    return await pool.request()
    .input('varId',sql.Int, id)
    .query(sqlString, function(err, data){
        if(err){
            result(true, null);
          } else {
            result(null, data);
          }
    }); 
};  */
    async getInfoOLT(ip, result) {
        var pool = await conn;
        var sqlString = 'select *  from OLT where IP = @varIP';
        return await pool
            .request()
            .input('varIP', sql.VarChar, ip)
            .query(sqlString, function (err, data) {
                if (data.recordset.length > 0) {
                    result(null, data.recordset[0]);
                } else {
                    result(true, null);
                }
            });
    }

    async getVlanNet(slid_ip, result) {
        var chuoiid = slid_ip.substr(0, 9);
        var ip = slid_ip.substr(10, 12);
        var card = xuly.getCard(chuoiid);
        var pon = xuly.getPon(chuoiid);
        var id = xuly.getID(chuoiid);
        var pool = await conn;
        var sqlString =
            ' select *  from DungLuongVlanNet ,CardOLT , OLT ' +
            ' where DungLuongVlanNet.ID_CARD = CardOLT.ID_CARD and CardOLT.ID_OLT = OLT.ID_OLT and DungLuongVlanNet.Card =@Card and DungLuongVlanNet.Pon =@Pon and OLT.IP = @IP';

        return await pool
            .request()
            .input('Card', sql.VarChar, card)
            .input('Pon', sql.VarChar, pon)
            .input('IP', sql.VarChar, ip)
            .query(sqlString, function (err, data) {
                if (data.recordset.length > 0) {
                    result(null, data.recordset[0]);
                } else {
                    result(true, null);
                }
            });
    }

    //end
}
module.exports = new khaibaothuebaoModel();
