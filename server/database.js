var mysql = require('mysql');

var dbconnect = {
getConnection: function() {
    var conn = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "password@123",
    database: "bed_dvd_db",
    dateStrings: true,
});
return conn;
}
};

module.exports = dbconnect