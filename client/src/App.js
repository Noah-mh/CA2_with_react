import "./App.css";
import React, { useContext, useMemo, useEffect } from "react";
import Navbar from "./components/Navbar";
import { AuthContext } from "./useContext";
import { Navigate, Routes, Route } from "react-router-dom";
import Home from "./pages";
import FilmDetails from "./pages/FilmDetails";
import AddActor from "./pages/AddActor";
import AddCustomer from "./pages/AddCustomer";
import Login from "./pages/Login";
import Register from "./pages/Register";

const App = () => {
  const { isAuth, setIsAuth, token, setToken } = useContext(AuthContext);

  useEffect(() => {
    const storedToken = localStorage.getItem("authToken");
    if (storedToken) {
      setIsAuth(true);
      setToken(storedToken);
    }
  }, []);

  const public_route = React.useMemo(() => {
    return (
      <>
        <Route path="/" element={<Home />} />
        <Route path="/films/:film_id" element={<FilmDetails />} />
      </>
    );
  }, []);

  const authed_route = useMemo(() => {
    return (
      <>
        <Route path="/add/actor" element={<AddActor />} />
        <Route path="/add/customer" element={<AddCustomer />} />
        <Route path="*" element={<Navigate to="/" />} />
        {public_route}
      </>
    );
  }, []);

  const unAuthed_route = useMemo(() => {
    return (
      <>
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="*" element={<Navigate to="/login" />} />
        {public_route}
      </>
    );
  }, []);

  return (
    <>
      <Navbar />
      <Routes>{isAuth ? authed_route : unAuthed_route}</Routes>
    </>
  );
};

export default App;
