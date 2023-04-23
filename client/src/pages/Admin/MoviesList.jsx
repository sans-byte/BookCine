import React, { useEffect, useState } from "react";
import MoviesForm from "./MoviesForm";
import { FaPencilAlt, FaTrashAlt } from "react-icons/fa";
import { Table, message } from "antd";
import moment from "moment";
import { deleteMovie, getAllMovies } from "../../services/movieService";
import { hideLoading, showLoading } from "../../redux/loaderSlice";
import { useDispatch } from "react-redux";

function MoviesList() {
  const [movies, setMovies] = useState();
  const [showMoviesForm, setShowMoviesForm] = useState(false);
  const [selectedMovie, setSelectedMovie] = useState();
  const [formType, setFormType] = useState();

  const handleAddMoviesForm = () => {
    setFormType("add");
    setShowMoviesForm(true);
  };
  const dispatch = useDispatch();

  const handleMovieDelete = async (movieId) => {
    try {
      dispatch(showLoading());
      const response = await deleteMovie({ movieId });
      if (response.success) {
        message.success(response.message);
        getAllMoviesData();
      } else {
        message.error(response.message);
      }
      dispatch(hideLoading());
    } catch (err) {
      dispatch(hideLoading());
      message.error(err.message);
    }
  };

  // fetching all the movies from the database
  const getAllMoviesData = async () => {
    try {
      dispatch(showLoading());
      const response = await getAllMovies();
      if (response.success) {
        setMovies(response.data);
        console.log(response.data);
      } else {
        message.error(response.message);
      }
      dispatch(hideLoading());
    } catch (error) {
      dispatch(hideLoading());
      message.error(error.message);
    }
  };

  // on page load we need to fetch the data of all the movies already present

  useEffect(() => {
    getAllMoviesData();
  }, []);

  // Columns data for the antd component of the table
  const columns = [
    {
      title: "Poster",
      dataIndex: "moivePosterURL",
      key: "posterURL",
      render: (text, record) => (
        <img
          src={record.moviePosterURL}
          style={{ width: "100px", height: "100px", objectFit: "contain" }}
        />
      ),
    },
    {
      title: "Name",
      dataIndex: "movieName",
      key: "name",
    },
    {
      title: "Duration",
      dataIndex: "movieDuration",
      key: "year",
    },
    {
      title: "Genre",
      dataIndex: "movieGenre",
      key: "genre",
    },
    {
      title: "Language",
      dataIndex: "movieLanguage",
      key: "rating",
    },
    {
      title: "Release Data",
      dataIndex: "movieReleaseDate",
      key: "releaseDate",
      render: (text, record) => {
        console.log(record);
        return moment(record.movieReleaseDate).format("DD-MM-YYYY");
      },
    },
    {
      title: "Action",
      dataIndex: "action",
      key: "action",
      render: (text, record) => {
        return (
          <div>
            <button
              className="btn-sm btn text-primary"
              onClick={() => {
                setSelectedMovie(record);
                setFormType("edit");
                setShowMoviesForm(true);
              }}
            >
              <FaPencilAlt />
            </button>
            <button
              className="btn btn-sm text-danger"
              onClick={(e) => {
                console.log(record._id);
                handleMovieDelete(record._id);
              }}
            >
              <FaTrashAlt />
            </button>
          </div>
        );
      },
    },
  ];

  return (
    <div>
      <div className="container">
        {showMoviesForm ? (
          <MoviesForm
            showMoviesForm={showMoviesForm}
            setShowMoviesForm={setShowMoviesForm}
            setSelectedMovie={setSelectedMovie}
            selectedMovie={selectedMovie}
            formType={formType}
            // It will run internally so that we can get the updated data when we close the form
            getData={getAllMoviesData}
          />
        ) : (
          <div>
            <div className="text-end">
              <button
                className="btn btn-sm btn-primary"
                onClick={handleAddMoviesForm}
              >
                Add Movies
              </button>
            </div>
            <div className="mt-2">
              <Table
                dataSource={movies}
                columns={columns}
                pagination={{ pageSize: 2 }}
              />
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default MoviesList;
