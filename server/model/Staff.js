const db = require("../database");
const config = require("../config.js");
const jwt = require("jsonwebtoken");
const staffDB = {
  loginUser: function (email, password, callback) {
    var conn = db.getConnection();

    conn.connect(function (err) {
      if (err) {
        console.log(err);
        return callback(err, null);
      } else {
        // console.log("Connected!");

        var sql = "select * from staff where email=? and password=?";

        conn.query(sql, [email, password], function (err, result) {
          conn.end();

          if (err) {
            console.log("Err: " + err);
            return callback(err, null, null);
          } else {
            var token = "";
            var i;
            if (result.length == 1) {
              token = jwt.sign(
                { id: result[0].staff_id, store_id: result[0].store_id },
                config.key,
                {
                  expiresIn: 86400, //expires in 24 hrs
                }
              );
              console.log("@@token " + token);
              return callback(null, token, result);
            } else {
              var err2 = new Error("UserID/Password does not match.");
              err2.statusCode = 500;
              return callback(err2, null, null);
            }
          } //else
        });
      }
    });
  },
};

module.exports = staffDB;
