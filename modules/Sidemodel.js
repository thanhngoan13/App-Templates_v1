const { conn, sql } = require('../connectdb');
const xuly = require('./xuly');


class Sidemodel {





    //ham lay danh sach  
    async getAll(result) {
        var pool = await conn;
        var sqlString = "select * from TrungTam";
        return await pool.request()
            .query(sqlString, function (err, data) {
                if (data.recordset.length > 0) {
                    result(null, data.recordset);
                }
                else {
                    result(true, null);
                }

            }
            );
    }

    //ham xoa 
    async Delete(id, result) {
        // var id = req.params.id;
        var pool = await conn;
        var sqlString = "delete  from TrungTam where ID_TT = @varID";
        return await pool.request()
            .input('varID', sql.Int, id)
            .query(sqlString, function (err, data) {
                if (err) {
                    //xoa loi 
                    result(true, null);

                }
                else {
                    result(null, data);
                }

            }
            );

        console.log(err);
    }

    //ham 
    async getInfoOLT(ip, result) {

        var pool = await conn;
        var sqlString = "select *  from OLT where IP = @varIP";
        return await pool.request()
            .input('varIP', sql.VarChar, ip)
            .query(sqlString, function (err, data) {
                if (data.recordset.length > 0) {
                    result(null, data.recordset[0]);

                }
                else {
                    result(true, null);
                }


            }
            );

        console.log(err);
    }


    async getMacOLT(ip, result) {

       

        console.log(err);
    }


    async getVlanNet(slid_ip, result) {


        var chuoiid = slid_ip.substr(0, 9);
        var ip = slid_ip.substr(10, 12);
        var card = xuly.getCard(chuoiid);
        var pon = xuly.getPon(chuoiid);
        var id = xuly.getID(chuoiid);
      
        var pool = await conn;

        var sqlString = " select *  from DungLuongVlanNet ,CardOLT , OLT "
            + " where DungLuongVlanNet.ID_CARD = CardOLT.ID_CARD and CardOLT.ID_OLT = OLT.ID_OLT and DungLuongVlanNet.Card =@Card and DungLuongVlanNet.Pon =@Pon and OLT.IP = @IP";

        return await pool.request()
            .input('Card', sql.VarChar, card)
            .input('Pon', sql.VarChar, pon)
            .input('IP', sql.VarChar, ip)
            .query(sqlString, function (err, data) {
                if (data.recordset.length > 0) {
                    result(null, data.recordset[0]);
                   

                }
                else {
                    result(true, null);
                }


            }
            );


    }
}

module.exports = new Sidemodel;




