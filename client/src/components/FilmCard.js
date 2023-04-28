import React from "react";
import { Link } from "react-router-dom";
import "./CSS/FilmCard.css";
const FilmCard = ({ film }) => {
  const film_id = parseInt(film.id);
  return (
    <>
      <div class="card">
        <div class="card-details">
          <figure>
            <img src="" alt="DVD Image" />
          </figure>
          <p class="text-title ">{film.title}</p>
          <p class="text-body text-truncate">{film.description}</p>
          <div className="flex gap-2">
            <div className="badge badge-secondary">{film.name}</div>
            <div className="badge badge-primary badge-outline">
              {film.rating}
            </div>
          </div>
        </div>
        <button class="card-button">
          <Link to={`/films/${film_id}`}>View</Link>
        </button>
      </div>
      {/* <div className="card bg-base-100 rounded-sm ring ring-primary shadow-xl">
        <figure>
          <img src="" alt="DVD Image" />
        </figure>
        <div className="card-body">
          <h2 className="card-title">{film.title}</h2>
          <p className="text-sm">{film.description}</p>
          <div className="flex gap-2">
            <div className="badge badge-secondary">{film.name}</div>
            <div className="badge badge-primary badge-outline">
              {film.rating}
            </div>
          </div>
          <div className="card-actions justify-end">
            <Link
              to={`/films/${film_id}`}
              className="btn btn-primary btn-sm rounded-sm"
            >
              View
            </Link>
          </div>
        </div>
      </div> */}
    </>
  );
};

export default FilmCard;
