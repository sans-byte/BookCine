import React, { useState } from "react";
import MoviesForm from "./MoviesForm";

function MoviesList() {
  const [movies, setMovies] = useState();
  const [showMoviesForm, setShowMoviesForm] = useState(false);
  const [selectedMovies, setSelectedMovies] = useState();

  const handleShowAddMoviesForm = () => {
    setShowMoviesForm(true);
  };

  return (
    <div>
      <div className="container">
        {showMoviesForm ? (
          <MoviesForm
            showMoviesForm={showMoviesForm}
            setShowMoviesForm={setShowMoviesForm}
            setSelectedMovies={setSelectedMovies}
            selectedMovies={selectedMovies}
            formType="add"
          />
        ) : (
          <div className="text-end">
            <button
              className="btn btn-sm btn-primary"
              onClick={handleShowAddMoviesForm}
            >
              Add Movies
            </button>
          </div>
        )}
      </div>
    </div>
  );
}

export default MoviesList;
