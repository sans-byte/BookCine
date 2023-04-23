import React, { useEffect, useState } from "react";
import GetCarousel from "../../components/GetCarousel";
import Navbar from "../../components/Navbar/Navbar";
import CardGrid from "../../components/CardGrid";
import { Divider, message } from "antd";
import { useDispatch } from "react-redux";
import { getAllMovies } from "../../services/movieService";
import { hideLoading, showLoading } from "../../redux/loaderSlice";

function Home() {
  const [movies, setMovies] = useState([]);

  const dispatch = useDispatch();
  // fetching the data about the movie currently in database

  // TODO :: show only the latest upcoming moviess
  const getAllMoviesData = async () => {
    try {
      dispatch(showLoading());
      const response = await getAllMovies();
      if (response.success) {
        setMovies(response.data);
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

  return (
    <>
      <div>
        <Navbar />
        <div>
          <GetCarousel />
        </div>
        <div>
          <Divider
            orientation="left"
            className="fs-2 fw-bold "
            id="movies_section"
          >
            Movies
          </Divider>
          <CardGrid moviesData={movies} />
        </div>
      </div>
    </>
  );
}

export default Home;
