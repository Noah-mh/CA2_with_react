var db = require("../database.js");

const filmDB = {
  getFilmCategories: function (callback) {
    var conn = db.getConnection();
    conn.connect(function (err) {
      if (err) {
        console.log(err);
        return callback(err, null);
      } else {
        // console.log("***Connected!");

        var sql = `SELECT name FROM category`;
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

  getFilmById: function (film_id, callback) {
    var conn = db.getConnection();
    var actors = [];
    conn.connect(function (err) {
      if (err) {
        console.log(err);
        return callback(err, null);
      } else {
        // console.log("***Connected!");
        var sql1forFilm = `SELECT \
        language.name as language, category.name as category,\
        rental_duration, rental_rate, length, replacement_cost, special_features,\
        film.title as title, film.release_year as release_year,\
        film.film_id as id, film.description as description, \
        film.rating as rating\
        FROM film join film_category\
        on film.film_id = film_category.film_id\
        join category on film_category.category_id = category.category_id\
        join language on film.language_id = language.language_id\
        WHERE film.film_id = ?`;

        var sql2ForActors = `SELECT actor.first_name, actor.last_name
        FROM actor
        JOIN film_actor ON film_actor.actor_id = actor.actor_id
        WHERE film_actor.film_id = ?;`;

        conn.query(sql1forFilm, [film_id], function (err, result1) {
          if (err) {
            console.log(err);
            return callback(err, null);
          } else {
            conn.query(sql2ForActors, [film_id], function (err, result2) {
              conn.end();
              if (err) {
                console.log(err);
                return callback(err, null);
              } else {
                actors = result2.map((actor) => {
                  actor.first_name = actor.first_name.toLowerCase();
                  actor.last_name = actor.last_name.toLowerCase();
                  // capitalize first letter of first and last name
                  actor.first_name =
                    actor.first_name.charAt(0).toUpperCase() +
                    actor.first_name.slice(1);
                  actor.last_name =
                    actor.last_name.charAt(0).toUpperCase() +
                    actor.last_name.slice(1);
                  return actor.first_name + " " + actor.last_name;
                });
                result1[0].actors = actors;
                return callback(null, result1);
              }
            });
          }
        });
      }
    });
  },

  getFilms: function (category, search, rental_rate, page, per_page, callback) {
    var conn = db.getConnection();
    conn.connect(function (err) {
      if (err) {
        console.log(err);
        return callback(err, null);
      } else {
        // console.log("***Connected!");

        var sql = `SELECT category.name as name, film.title as title, film.film_id as id, film.description as description, \
        film.rating as rating\
        FROM film join film_category\
        on film.film_id = film_category.film_id\
        join category on film_category.category_id = category.category_id\
        WHERE LOWER(category.name) LIKE ?\
        AND LOWER(film.title) LIKE ?\
        AND film.rental_rate <= ?\
        LIMIT ${per_page} OFFSET ?`;

        conn.query(
          sql,
          [category, search, rental_rate, (page - 1) * per_page],
          function (err, result) {
            conn.end();
            if (err) {
              console.log(err);
              return callback(err, null);
            } else {
              return callback(null, result);
            }
          }
        );
      }
    });
  },
  addFilm: function (
    title,
    description,
    release_year,
    language_id,
    rental_duration,
    rental_rate,
    length,
    replacement_cost,
    rating,
    special_features,
    callback
  ) {
    var conn = db.getConnection();
    conn.connect(function (err) {
      if (err) {
        console.log(err);
        return callback(err, null);
      } else {
        // console.log("Connected!");
        var sql =
          "Insert into bed_dvd_db.film(title,description, release_year,language_id,rental_duration,rental_rate,length,replacement_cost,rating,special_features) values(?,?,?,?,?,?,?,?,?,?)";

        conn.query(
          sql,
          [
            title,
            description,
            release_year,
            language_id,
            rental_duration,
            rental_rate,
            length,
            replacement_cost,
            rating,
            special_features,
          ],
          function (err, result) {
            conn.end();

            if (err) {
              console.log(err);
              return callback(err, null);
            } else {
              console.log(result.insertId);
              return callback(null, result);
            }
          }
        );
      }
    });
  },
};

module.exports = filmDB;
