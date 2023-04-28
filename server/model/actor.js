var db = require("../database.js");

const actorDB = {
addActor: function (first_name, last_name, callback) {
    var conn = db.getConnection();
    conn.connect(function (err) {
      if (err) {
        console.log(err);
        return callback(err, null);
      } else {
        //console.log("Connected!");
        var sql =
          "Insert into bed_dvd_db.actor(first_name, last_name) values(?,?)";

        conn.query(sql, [first_name, last_name], function (err, result) {
          conn.end();

          if (err) {
            console.log(err);
            return callback(err, null);
          } else {
            console.log(result.insertId);
            return callback(null, result);
          }
        });
      }
    });
  },
};
module.exports = actorDB;