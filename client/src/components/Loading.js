import React from "react";
import { MutatingDots } from "react-loader-spinner";

import "./CSS/Loading.css";

export default function Loading() {
  return (
    <div class="container">
      <div class="loader"></div>
      <div class="loader"></div>
      <div class="loader"></div>
    </div>
  );
}
