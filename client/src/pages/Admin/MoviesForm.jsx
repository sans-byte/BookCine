import React from "react";

function MoviesForm({
  selectedMovies,
  setSelectedMovies,
  showMoviesForm,
  setShowMoviesForm,
  formType,
}) {
  const handleCancel = (e) => {
    e.preventDefault();
    setShowMoviesForm(false);
  };

  return (
    <div>
      <div className="w-50">
        <form action="">
          <div className="mb-2">
            <label htmlFor="" className="form-label">
              Movies
            </label>

            <input
              type="text"
              className="form-control"
              placeholder="Enter Name"
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
                required
              />
            </div>
            <div className="col">
              <label htmlFor="exampleInputEmail1" className="form-label">
                Movies Duration
              </label>

              <input
                type="time"
                className="form-control"
                placeholder="Duration"
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
                required
              />
            </div>
            <div className="col">
              <label htmlFor="exampleInputEmail1" className="form-label">
                Genre
              </label>

              <select class="form-select" required>
                <option selected>Select Genre</option>
                <option value="1">Action</option>
                <option value="2">Anime</option>
                <option value="3">Drama</option>
                <option value="4">Thriller</option>
                <option value="5">Horror</option>
              </select>
            </div>
          </div>
          <div className="">
            <label htmlFor="exampleInputEmail1" className="form-label">
              Poster URL
            </label>

            <input
              type="text"
              className="form-control"
              placeholder="Poster URL"
              required
            />
          </div>
          <div className="mt-3 ">
            <button className="btn btn-sm btn-danger me-2"> Submit </button>
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
      </div>
    </div>
  );
}

export default MoviesForm;
