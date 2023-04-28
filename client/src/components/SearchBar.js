import React, { useState, useEffect } from "react";
import axios from "axios";
import "./CSS/searchbar.css";
const SearchBar = ({
  setCategory,
  setSearch,
  search,
  category,
  rentalRate,
  setRentalRate,
}) => {
  const [categories, setCategories] = useState([]);

  useEffect(() => {
    axios
      .get(`/api/categories`)
      .then((response) => {
        setCategories(response.data);
      })
      .catch((error) => {
        console.error(error);
      });
  }, [category]);

  return (
    <div className="flex gap-4">
      <div className="form-control w-full max-w-xs">
        <input
          autoFocus
          onChange={(e) => setSearch(e.target.value)}
          value={search}
          type="text"
          placeholder="Search for a film..."
          className="input input-bordered w-fit"
        />
      </div>
      <div className="form-control w-full max-w-xs">
        <input
          autoFocus
          onChange={(e) => setRentalRate(parseFloat(e.target.value))}
          value={rentalRate}
          type="number"
          placeholder="Max rental rate..."
          className="input input-bordered w-full max-w-xs"
        />
      </div>
      <div className="form-control w-full max-w-fit">
        <select
          value={category}
          onChange={(e) => setCategory(e.target.value)}
          className="select select-bordered"
        >
          <option value={""}>All</option>
          {categories.map((category) => {
            return (
              <option key={category.name} value={category.name}>
                {category.name}
              </option>
            );
          })}
        </select>
      </div>

      <button
        onClick={() => {
          setSearch("");
          setCategory("");
          setRentalRate("");
        }}
        class="btnbtn" classname="form-control w-full max-w-xs"
      >
        <p class="paragraph"> Clear </p>
        <span class="icon-wrapper">
          <svg
            class="icon"
            width="30px"
            height="30px"
            viewBox="0 0 24 24"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M6 7V18C6 19.1046 6.89543 20 8 20H16C17.1046 20 18 19.1046 18 18V7M6 7H5M6 7H8M18 7H19M18 7H16M10 11V16M14 11V16M8 7V5C8 3.89543 8.89543 3 10 3H14C15.1046 3 16 3.89543 16 5V7M8 7H16"
              stroke="#000000"
              stroke-width="2"
              stroke-linecap="round"
              stroke-linejoin="round"
            ></path>
          </svg>
        </span>
      </button>
    </div>
  );
};
export default SearchBar;
