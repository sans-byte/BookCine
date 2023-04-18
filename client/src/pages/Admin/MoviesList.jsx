import React, { useEffect, useState } from "react";
import MoviesForm from "./MoviesForm";
import { FaPencilAlt, FaTrashAlt } from "react-icons/fa";
import { Table, message } from "antd";
import moment from "moment";
import { getAllMovies } from "../../services/movieService";
import { hideLoading, showLoading } from "../../redux/loaderSlice";
import { useDispatch } from "react-redux";

function MoviesList() {
  const [movies, setMovies] = useState();
  const [showMoviesForm, setShowMoviesForm] = useState(false);
  const [selectedMovie, setSelectedMovie] = useState();
  const [formType, setFormType] = useState();

  const handleShowAddMoviesForm = () => {
    setShowMoviesForm(true);
  };
  const dispatch = useDispatch();

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
        return moment(record.releaseDate).format("DD-MM-YYYY");
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
            <button className="btn btn-sm text-danger">
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
          />
        ) : (
          <div>
            <div className="text-end">
              <button
                className="btn btn-sm btn-primary"
                onClick={handleShowAddMoviesForm}
              >
                Add Movies
              </button>
            </div>
            <div className="mt-2">
              <Table dataSource={movies} columns={columns} />
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default MoviesList;
