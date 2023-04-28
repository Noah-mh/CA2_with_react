import React from "react";
import ReactDOM from "react-dom/client";

import App from "./App";
import "./index.css";
// import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { AuthProvider } from "./useContext";
import axios from "axios";
import { BrowserRouter as Router } from "react-router-dom";
axios.defaults.baseURL = "http://localhost:8081";
axios.defaults.headers.post["Content-Type"] = "application/json";
// const queryClient = new QueryClient();

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <AuthProvider>
      <Router>
        <App />
      </Router>
    </AuthProvider>
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
