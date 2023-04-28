import React, { useContext, useState, useEffect } from "react";
import "./CSS/Login.css";
import axios from "axios";
import { AuthContext } from "../useContext";
import { Link } from "react-router-dom";
export default function Login() {
  const { isAuth, setIsAuth, token, setToken } = useContext(AuthContext);
  const [first_name, setFirst_Name] = useState("");
  const [last_name, setLast_Name] = useState("");
  const handleSubmit = (e) => {
    e.preventDefault();
    const body = { first_name, last_name };
    console.log(body);
    axios
      .post(`/api/actors`, body)
      .then((response) => {
        alert(`New Actor Added`);
        setFirst_Name("");
        setLast_Name("");
      })
      .catch((error) => {
        console.error(error);
      });
  };

  return (
    <>
      <div class="login-box">
        <p className="text-center text-gray-400 font-bold p-5">
          Actor/Actress'
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
                name="email"
                onChange={(e) => {
                  setLast_Name(e.target.value);
                }}
              />
              <label>Last name</label>
            </div>
          </div>

          <center>
            <button type="submit">
              Add Actor
              <span></span>
            </button>
          </center>
        </form>
      </div>
    </>
  );
}
