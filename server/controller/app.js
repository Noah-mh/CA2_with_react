const express = require("express");
const bodyParser = require("body-parser");
const app = express();

const verifyToken = require("../auth/verifyToken.js");
const cors = require("cors");
app.use(bodyParser.json());

const Film = require("../model/Film");
const Staff = require("../model/Staff");
const ActorDB = require("../model/actor");
const CustomerDB = require("../model/customer");

app.options("*", cors());
app.use(cors());

app.get("/api/categories", async (req, res) => {
  Film.getFilmCategories(function (err, result) {
    if (!err) {
      res.status(200).json(result);
    } else {
      res.status(500).send(null);
    }
  });
});

app.get("/api/films", async (req, res) => {
  let { page, per_page, search, category, rental_rate } = req.query;

  search = search || "";
  category = category || "";
  if (isNaN(rental_rate) || rental_rate === "") rental_rate = 999999;
  rental_rate = parseFloat(rental_rate);
  search = "%" + search + "%";
  category = "%" + category + "%";

  per_page = parseInt(per_page);
  page = page || 1;

  Film.getFilms(
    category,
    search,
    rental_rate,
    page,
    per_page,
    function (err, result) {
      if (!err) {
        res.status(200).json(result);
      } else {
        res.status(500).send(null);
      }
    }
  );
});

app.get("/api/films/:film_id", async (req, res) => {
  let id = req.params.film_id;
  console.log(id);
  Film.getFilmById(id, function (err, result) {
    if (!err) {
      res.status(200).json(result[0]);
    } else {
      res.status(500).send(null);
    }
  });
});

app.post("/api/login", async (req, res) => {
  const { email, password } = req.body;

  Staff.loginUser(email, password, function (err, token, result) {
    if (!err) {
      res.statusCode = 200;
      res.setHeader("Content-Type", "application/json");
      delete result[0]["password"]; //clear the password in json data, do not send back to client
      console.log(result);
      res.json({
        success: true,
        UserData: JSON.stringify(result),
        token: token,
        status: "You are successfully logged in!",
      });

      res.send();
    } else {
      res.status(500);
      res.send(err.statusCode);
    }
  });
});

app.post("/api/user/login", async (req, res) => {
  const { email, password } = req.body;

  CustomerDB.loginCustomer(email, password, function (err, result) {
    if (!err) {
      res.status(200).json(result);
    } else {
      res.status(500).send(null);
    }
  });
});

app.post("/api/actors", async (req, res) => {
  var first_name = req.body.first_name;
  var last_name = req.body.last_name;

  ActorDB.addActor(first_name, last_name, function (err, result) {
    if (first_name == null || last_name == null) {
      res.status(400).json({ error_msg: `missing data` });
    } else if (!err) {
      res.status(201).json(result);
    } else {
      res.status(500).json({ error_msg: `Internal server error` });
    }
  });
});

app.post("/api/add/customer/", async (req, res) => {
  //get parameters from the body object
  const { store_id, first_name, last_name, email, address } = req.body;

  //runs addActor function
  CustomerDB.addCustomer(
    store_id,
    first_name,
    last_name,
    email,
    address,
    function (err, result) {
      if (
        first_name === undefined ||
        last_name === undefined ||
        store_id === undefined ||
        address === undefined ||
        email === undefined
      ) {
        //if information is missing from the body object
        res.status(400).send({ error_msg: "missing data" });
      } else if (err) {
        if (err.errno == 1062) {
          //if email entered already exists
          res.status(409).send({ error_msg: "email already exist" });
        } else {
          //if there is any other error
          res.status(500).send({ error_msg: "Internal server error" });
        }
      } else {
        //if the proccess is successful
        res.status(201).json(result);
      }
    }
  );
});

app.get("/api/store", async (req, res) => {
  CustomerDB.getStores(function (err, result) {
    if (!err) {
      res.status(200).json(result);
    } else {
      res.status(500).send(null);
    }
  });
});

app.get("/api/city", async (req, res) => {
  CustomerDB.getCities(function (err, result) {
    if (!err) {
      res.status(200).json(result);
    } else {
      res.status(500).send(null);
    }
  });
});

module.exports = app;
