import React, { useState, useEffect } from "react";
import axios from "axios";
import DelaySearch from "../components/DelaySearch";
import FilmCard from "../components/FilmCard";
import SearchBar from "../components/SearchBar";
import Loading from "../components/Loading";

const per_page = 8;

export default function Home() {
  const [page, setpage] = useState(1);
  const [films, setfilms] = useState([]);
  const [search, setsearch] = useState("");
  const [category, setcategory] = useState("");
  const [rental_rate, setrental_rate] = useState("");
  const delaySearch = DelaySearch(search, 1000);
  const delayRental_rate = DelaySearch(rental_rate, 1000);
  const [isLoading, setisLoading] = useState(true);
  const [prevPage, setPrevPage] = useState(null);
  const [isPreviousData, setIsPreviousData] = useState(false);

  useEffect(() => {
    if (prevPage === page) {
      setIsPreviousData(true);
    }

    setIsPreviousData(false);
    setisLoading(true);
    console.log("before axios", category);
    axios
      .get(
        `/api/films?per_page=${per_page}&page=${page}&search=${delaySearch}&category=${category}&rental_rate=${delayRental_rate}`
      )
      .then((response) => {
        setfilms(response.data);
        setisLoading(false);
        setPrevPage(page);
      })
      .catch((error) => {
        console.error(error);
      });
  }, [ page, delaySearch, category, delayRental_rate]);

  useEffect(() => {
    setpage(1);
    setPrevPage(null);
    setIsPreviousData(false);
  }, [delaySearch, category]);
  console.log(category);

  if (isLoading) {
    return <Loading />;
  }
  return (
    <>
      <main className="px-12 pb-6">
        <SearchBar
          category={category}
          search={search}
          setSearch={setsearch}
          setCategory={setcategory}
          rentalRate={rental_rate}
          setRentalRate={setrental_rate}
        />

        <div className="grid mt-6 md:grid-cols-3 lg:grid-cols-4 gap-8 grid-cols-1">
          {films.length === 0 && (
            <h1 className="font-bold text-2xl">No results!</h1>
          )}
          {films.map((film) => {
            return <FilmCard key={film.id} film={film} />;
          })}
        </div>
        <div className="btn-group mt-6">
          <button
            disabled={page === 1 || isPreviousData}
            onClick={() => setpage(1)}
            className="btn"
          >
            «
          </button>
          <button
            disabled={page === 1 || isPreviousData}
            onClick={() => setpage(page - 1)}
            className="btn"
          >
            {"<"}
          </button>
          <button onClick={() => setpage(1)} className="btn">
            Page {page} / {1000 / per_page}
          </button>
          <button
            disabled={isPreviousData}
            onClick={() => setpage(page + 1)}
            className="btn"
          >
            {">"}
          </button>
          <button
            disabled={isPreviousData}
            onClick={() => setpage(1000 / per_page)}
            className="btn"
          >
            »
          </button>
        </div>
      </main>
    </>
  );
}
