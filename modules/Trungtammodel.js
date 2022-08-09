const {conn,sql } = require('../connectdb');


class Trungtammodel {

   //ham lay danh sach  
  async  getAll(result) {
      var pool = await conn;
      var sqlString = "select * from TrungTam";
      return await pool.request()
      .query(sqlString, function(err,data){
            if(data.recordset.length>0) {
                result(null, data.recordset);
            }
            else {
                result(true,null);
            }

      }
      );
    }

    //ham xoa 
    async Delete(id,result) {
       // var id = req.params.id;
        var pool = await conn;
      var sqlString = "delete  from TrungTam where ID_TT = @varID";
      return await pool.request()
      .input('varID',sql.Int,id)
      .query(sqlString, function(err,data){
            if(err) {
                //xoa loi 
                result(true, null);
                
            }
            else {
                result(null,data);
            }

      }
      );

      console.log(err);
    }

     //ham xoa 
     async getOne(id,result) {
       
         var pool = await conn;
       var sqlString = "select *  from TrungTam where ID_TT = @varID";
       return await pool.request()
       .input('varID',sql.Int,id)
       .query(sqlString, function(err,data){
        if(data.recordset.length>0) {
            result(null, data.recordset[0]);
        }
        else {
            result(true,"Loi lay di lieu tu DB");
        }

 
       }
       );
 
       console.log(err);
     }

}

module.exports = new Trungtammodel;




