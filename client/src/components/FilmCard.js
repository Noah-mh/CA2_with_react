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

    </>
  );
};

export default FilmCard;
