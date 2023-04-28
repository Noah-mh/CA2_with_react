import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { StarIcon } from "@heroicons/react/24/outline";
import { StarIcon as FilledStarIcon } from "@heroicons/react/24/solid";

import axios from "axios";
import Loading from "../components/Loading";

const minsToHoursConvertion = (minutes) => {
  const hours = Math.floor(minutes / 60);
  const mins = minutes % 60;
  return `${hours}hr ${mins}min`;
};

export default function FilmDetails() {
  const { film_id } = useParams();
  const [film, setfilm] = useState(null);

  const [isLoading, setisLoading] = useState(true);

  useEffect(() => {
    axios
      .get(`/api/films/${film_id}`)
      .then((response) => {
        setfilm(response.data);
        setisLoading(false);
      })
      .catch((error) => {
        console.error(error);
      });
  }, []);

  if (isLoading) {
    return <Loading />;
  }

  return (
    <main className="px-12 pb-6 flex flex-col gap-2">
      {console.log(film.special_features)}
      <div className="flex gap-4 items-center">
        <h1 className="text-3xl font-bold">
          {film.title}
          <span className="font-normal"> ({film.release_year})</span>
        </h1>
        <StarIcon className="h-6 w-6 cursor-pointer hover:scale-[110%] transition-all" />
      </div>
      <div className="flex gap-2">
        <div className="border-2 border-primary rounded-sm px-[4px] text-primary">
          {film.rating}
        </div>
        <span className="ml-2">{film.category}</span>
        <span>∙</span>
        <span>{minsToHoursConvertion(film.length)}</span>
        <span>∙</span>
        <span>{film.language}</span>
      </div>
      <div id="overview-div">
        <h2 className="text-xl mt-6 font-bold">Overview</h2>
        <p className="max-w-xl">{film.description}</p>
      </div>
      <div id="actors-div">
        {film.actors.length > 0 && (
          <>
            <h2 className="text-xl mt-6 font-bold">Starring</h2>
            <div className="flex gap-4 max-w-xl mt-4 flex-wrap">
              <>
                {film.actors.map((actor, idx) => {
                  return (
                    <button
                      onClick={() => {
                        // open google search
                        window.open(
                          `https://www.google.com/search?q=${actor}`,
                          "_blank"
                        );
                      }}
                      key={idx}
                      className="btn btn-sm btn-outline"
                    >
                      {actor}
                    </button>
                  );
                })}
              </>
            </div>
          </>
        )}
      </div>
      <h2 className="text-xl mt-6 font-bold">Special features</h2>
      <div className="flex gap-6">
        {film.special_features &&
          film.special_features.split(",").map((feature, idx) => {
            return (
              <button key={idx} className="btn btn-sm cursor-default">
                {feature}
              </button>
            );
          })}
      </div>
      <h2 className="text-xl mt-6 font-bold">Rental Information</h2>
      <p>
        Rental duration: <span className="badge">{film.rental_duration}</span>
      </p>
      <p>
        Rental rate: <span className="badge">${film.rental_rate}</span>
      </p>
    </main>
  );
}
