const sql = require('mssql');
var config = {
    server: '10.95.14.203', //10.95.14.203
    user: 'sa',
    password: 'Admin@123',
    database: 'KhaiBaoThueBao', //QLSV //KhaiBaoThueBao
    synchronize: true,
    trustServerCertificate: true,
};
const conn = new sql.ConnectionPool(config).connect().then((pool) =>{
    return pool;
});

module.exports = {
    conn: conn,
    sql: sql,
};
