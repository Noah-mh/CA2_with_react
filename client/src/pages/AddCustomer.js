import React, { useContext, useState, useEffect } from "react";
import "./CSS/Login.css";
import axios from "axios";

export default function Login() {
  const [first_name, setFirst_Name] = useState("");
  const [last_name, setLast_Name] = useState("");
  const [email, setemail] = useState("");
  const [address_line1, setaddress_line1] = useState("");
  const [address_line2, setaddress_line2] = useState("");
  const [district, setdistrict] = useState("");
  const [postal_code, setpostal_code] = useState("");
  const [phone, setphone] = useState("");
  const [store_id, setstore_id] = useState("");
  const [city_id, setcity_id] = useState("");
  const [store, setstore] = useState("");
  const [stores, setstores] = useState([]);

  const [city, setcity] = useState("");
  const [cities, setcities] = useState([]);

  useEffect(() => {
    axios
      .get(`/api/store`)
      .then((response) => {
        setstores(response.data);
      })
      .catch((error) => {
        console.error(error);
      });
  }, []);
  useEffect(() => {
    axios
      .get(`/api/city`)
      .then((response) => {
        setcities(response.data);
      })
      .catch((error) => {
        console.error(error);
      });
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();
    const body = {
      first_name,
      last_name,
      store_id,
      email,
      address: {
        address_line1,
        address_line2,
        district,
        city_id,
        postal_code,
        phone,
      },
    };
    console.log(body);
    axios
      .post(`/api/add/customer`, body)
      .then((response) => {
        alert(`New Customer Added`);
        setFirst_Name("");
        setLast_Name("");
        setemail("");
        setaddress_line1("");
        setaddress_line2("");
        setdistrict("");
        setpostal_code("");
        setphone("");
        setstore("");
        setcity("");
      })
      .catch((error) => {
        console.error(error);
      });
  };

  return (
    <>
      <div class="login-box">
        <p className="text-center text-gray-400 font-bold p-5">
          Fill in Customer's Details
        </p>
        <form onSubmit={handleSubmit}>
          <div className="flex justify-between w-84">
            <div class="addactor-box">
              <input
                type="text"
                placeholder=""
                name="first_name"
                onChange={(e) => {
                  setFirst_Name(e.target.value);
                }}
              />
              <label>First Name</label>
            </div>
            <div class="addactor-box">
              <input
                type="text"
                placeholder=""
                name="last_name"
                onChange={(e) => {
                  setLast_Name(e.target.value);
                }}
              />
              <label>Last name</label>
            </div>
          </div>
          <div class="addactor-box">
            <input
              type="text"
              placeholder=""
              name="email"
              onChange={(e) => {
                setemail(e.target.value);
              }}
            />
            <label>Email</label>
          </div>
          <div className="flex justify-between w-84">
            <div class="addactor-box">
              <input
                type="text"
                placeholder=""
                name="address_line1"
                onChange={(e) => {
                  setaddress_line1(e.target.value);
                }}
              />
              <label>Address Line 1</label>
            </div>
            <div class="addactor-box">
              <input
                type="text"
                placeholder=""
                name="address_line2"
                onChange={(e) => {
                  setaddress_line2(e.target.value);
                }}
              />
              <label>Address Line 2</label>
            </div>
          </div>

          <div className="flex justify-between w-84">
            <div class="addactor-box">
              <input
                type="text"
                placeholder=""
                name="postal code"
                onChange={(e) => {
                  setpostal_code(e.target.value);
                }}
              />
              <label>Postal Code</label>
            </div>
            <div class="addactor-box">
              <input
                type="text"
                placeholder=""
                name="phone"
                onChange={(e) => {
                  setphone(e.target.value);
                }}
              />
              <label>Phone</label>
            </div>
          </div>
          <div className="flex justify-between w-84">
            <div class="addactor-box">
              <input
                type="text"
                placeholder=""
                name="district"
                onChange={(e) => {
                  setdistrict(e.target.value);
                }}
              />
              <label>District</label>
            </div>
            <div class="addactor-drop">
              <select
                value={store}
                onChange={(e) => setstore_id(e.target.value)}
                className="select select-bordered"
              >
                <option value={""}>Store</option>
                {stores.map((store) => {
                  return (
                    <option key={store.store_id} value={store.store_id}>
                      {store.address}
                    </option>
                  );
                })}
              </select>
            </div>
          </div>

          <div class="addactor-drop">
            <select
              value={city}
              onChange={(e) => setcity_id(e.target.value)}
              className="select select-bordered"
            >
              <option value={""}>City</option>
              {cities.map((city) => {
                return (
                  <option key={city.city_id} value={city.city_id}>
                    {city.city}
                  </option>
                );
              })}
            </select>
          </div>

          <center>
            <button type="submit">
              Add Customer
              <span></span>
            </button>
          </center>
        </form>
      </div>
    </>
  );
}
