var db = require("../database");
const customerDB = {
  addCustomer: function (
    store_id,
    first_name,
    last_name,
    email,
    address,
    callback
  ) {
    //get connection
    let conn = db.getConnection();

    conn.connect(function (err) {
      if (err) {
        //console log for debugging purposes
        console.log(err);
        return callback(err, null);
      } else {
        //if no error, execute the first sql code to enter data into address table
        const sql =
          "INSERT into bed_dvd_db.address(address, address2, district, city_id, postal_code, phone) values (?,?,?,?,?,?)";

        conn.query(
          sql,
          [
            address.address_line1,
            address.address_line2,
            address.district,
            address.city_id,
            address.postal_code,
            address.phone,
          ],
          function (err, result) {
            if (err) {
              //console log any errors for debugging
              console.log(err);
              return callback(err, null);
            } else {
              //if no errors, execute sql code to enter data into customer table
              const sql =
                "INSERT into bed_dvd_db.customer(store_id, first_name, last_name, email, address_id) values (?,?,?,?,?)";

              conn.query(
                sql,
                [store_id, first_name, last_name, email, result.insertId],
                function (err, result2) {
                  conn.end();
                  if (err) {
                    //console log any errors for debugging
                    console.log(err);
                    return callback(err, null);
                  } else {
                    //if no error, return result
                    console.log(result2);
                    return callback(null, result2);
                  }
                }
              );
            }
          }
        );
      }
    });
  },

  getStores: function (callback) {
    var conn = db.getConnection();
    conn.connect(function (err) {
      if (err) {
        console.log(err);
        return callback(err, null);
      } else {
        //console.log("***Connected!");

        var sql = `SELECT store.store_id, address.address FROM store\
        JOIN address ON store.address_id = address.address_id`;
        conn.query(sql, [], function (err, result) {
          conn.end();
          if (err) {
            console.log(err);
            return callback(err, null);
          } else {
            return callback(null, result);
          }
        });
      }
    });
  },
  getCities: function (callback) {
    var conn = db.getConnection();
    conn.connect(function (err) {
      if (err) {
        console.log(err);
        return callback(err, null);
      } else {
        //console.log("***Connected!");

        var sql = `SELECT city, city_id from city`;
        conn.query(sql, [], function (err, result) {
          conn.end();
          if (err) {
            console.log(err);
            return callback(err, null);
          } else {
            return callback(null, result);
          }
        });
      }
    });
  },

  loginCustomer: function (email, password, callback) {
    var conn = db.getConnection();

    conn.connect(function (err) {
      if (err) {
        console.log(err);
        return callback(err, null);
      } else {
        // console.log("Connected!");

        var sql = "select * from customer where email=? and password=?";

        conn.query(sql, [email, password], function (err, result) {
          conn.end();

          if (err) {
            console.log(err);
            return callback(err, null);
          } else {
            return callback(null, result);
          }
        });
      }
    });
  },
};

module.exports = customerDB;
