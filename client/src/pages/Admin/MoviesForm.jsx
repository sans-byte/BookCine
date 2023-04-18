import React, { useEffect, useRef, useState } from "react";
import { useDispatch } from "react-redux";
import { message } from "antd";
import { hideLoading, showLoading } from "../../redux/loaderSlice";
import { addMovie } from "../../services/movieService";

function MoviesForm({
  selectedMovie,
  setSelectedMovie,
  showMoviesForm,
  setShowMoviesForm,
  formType,
}) {
  const handleCancel = (e) => {
    e.preventDefault();
    setShowMoviesForm(false);
    setSelectedMovie(null);
  };

  const movieName = useRef();
  const movieDescription = useRef();
  const movieLanguage = useRef();
  const movieGenre = useRef();
  const movieReleaseDate = useRef();
  const movieDuration = useRef();
  const moviePosterURL = useRef();
  const movieTrailerURL = useRef();
  const dispatch = useDispatch();
  const [posterURL, setPosterURL] = useState();

  // It will fire if someOne wants to edit the movie
  // it will populate the form with the previous data
  useEffect(() => {
    if (selectedMovie) {
      console.log(selectedMovie);
      movieName.current.value = selectedMovie.movieName;
      movieDescription.current.value = selectedMovie.movieDescription;
      movieLanguage.current.value = selectedMovie.movieLanguage;
      movieGenre.current.value = selectedMovie.movieGenre;
      movieReleaseDate.current.value = selectedMovie.movieReleaseDate;
      movieDuration.current.value = selectedMovie.movieDuration;
      moviePosterURL.current.value = selectedMovie.moviePosterURL;
      movieTrailerURL.current.value = selectedMovie.movieTrailerURL;
      setPosterURL(selectedMovie.moviePosterURL);
    }
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const movieData = {
      movieName: movieName.current.value,
      movieDescription: movieDescription.current.value,
      movieLanguage: movieLanguage.current.value,
      movieDuration: movieDuration.current.value,
      moviePosterURL: moviePosterURL.current.value,
      movieGenre: movieGenre.current.value,
      movieReleaseDate: movieReleaseDate.current.value,
      movieTrailerURL: movieTrailerURL.current.value,
    };
    console.log(movieData);
    try {
      dispatch(showLoading());
      let response = null;
      if (formType == "add") {
        response = await addMovie(movieData);
      } else {
        // Here will come the logic for edit movie
      }
      if (response.success) {
        // setShowMoviesForm(false);
        message.success(response.message);
      } else {
        message.error(response.message);
      }
      dispatch(hideLoading());
    } catch (error) {
      dispatch(hideLoading());
      message.error(error.message);
    }
  };

  return (
    <div className="d-flex">
      {formType == "add" ? <h2> ADD Movie</h2> : <h2>Edit Movie</h2>}
      <div className="w-50">
        <form action="" onSubmit={(e) => handleSubmit(e)}>
          <div className="mb-2">
            <label htmlFor="" className="form-label">
              Movie Name
            </label>

            <input
              type="text"
              className="form-control"
              placeholder="Enter Name"
              ref={movieName}
              value={"something"}
              required
            />
          </div>
          <div className="mb-2">
            <label htmlFor="exampleInputEmail1" className="form-label">
              Movies Description
            </label>

            <textarea
              className="form-control"
              placeholder="Enter Description"
              ref={movieDescription}
            />
          </div>
          <div className="row mb-2">
            <div className="col">
              <label htmlFor="exampleInputEmail1" className="form-label">
                Movies Language
              </label>

              <input
                type="text"
                className="form-control"
                placeholder="Enter Language"
                ref={movieLanguage}
                required
              />
            </div>
            <div className="col">
              <label htmlFor="exampleInputEmail1" className="form-label">
                Movies Duration
              </label>

              <input
                type="Number"
                defaultValue={120}
                min={30}
                max={240}
                className="form-control"
                placeholder="Duration (in mins)"
                ref={movieDuration}
                required
              />
            </div>
          </div>
          <div className="row mb-2">
            <div className="col">
              <label htmlFor="exampleInputEmail1" className="form-label">
                Movies Release Date
              </label>

              <input
                type="date"
                className="form-control"
                placeholder="Release Date"
                ref={movieReleaseDate}
                required
              />
            </div>
            <div className="col">
              <label htmlFor="exampleInputEmail1" className="form-label">
                Genre
              </label>

              <select
                className="form-select"
                required
                ref={movieGenre}
                placeholder="Select Genre"
              >
                <option disabled value="Select Genre">
                  Select Genre
                </option>
                <option value="Action">Action</option>
                <option value="Anime">Anime</option>
                <option value="Drama">Drama</option>
                <option value="Thriller">Thriller</option>
                <option value="Horror">Horror</option>
              </select>
            </div>
          </div>
          <div className="row">
            <div className="col">
              <label htmlFor="exampleInputEmail1" className="form-label">
                Poster URL
              </label>

              <input
                type="text"
                className="form-control"
                placeholder="Poster URL"
                onChange={(e) => {
                  setPosterURL(e.target.value);
                }}
                ref={moviePosterURL}
                required
              />
            </div>
            <div className="col">
              <label htmlFor="exampleInputEmail1" className="form-label">
                Trailer URL
              </label>

              <input
                type="text"
                className="form-control"
                placeholder="Trailer URL"
                ref={movieTrailerURL}
                // required
              />
            </div>
          </div>
          <div className="mt-3 ">
            <button className="btn btn-sm btn-danger me-2" type="submit">
              Submit
            </button>
            <button
              className="btn btn-sm btn-danger"
              onClick={(e) => {
                handleCancel(e);
              }}
            >
              Cancel
            </button>
          </div>
        </form>
        {/* footer */}
        <div className="mb-3"></div>
      </div>
      <div className="w-50 text-center d-flex justify-content-center align-items-center">
        {posterURL ? (
          <img src={posterURL} alt="" style={{ maxWidth: "60%" }} />
        ) : (
          ""
        )}
      </div>
    </div>
  );
}

export default MoviesForm;
