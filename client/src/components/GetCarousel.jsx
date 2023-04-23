import React, { useState } from "react";
import { Carousel, message } from "antd";
import MovieBanner from "./MovieBanner";
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { hideLoading, showLoading } from "../redux/loaderSlice";
import { getAllMovies } from "../services/movieService";

// Styling for carousel

function GetCarousel() {
  const [pauseCarousel, setPauseCarousel] = useState(false);
  const [movies, setMovies] = useState([]);
  const dispatch = useDispatch();
  // fetching the data about the movie currently in database

  // TODO :: show only the latest upcoming moviess
  const getAllMoviesData = async () => {
    try {
      dispatch(showLoading());
      const response = await getAllMovies();
      if (response.success) {
        setMovies(response.data.slice(0, 4));
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
    <div className="">
      <Carousel
        autoplaySpeed={3000}
        fade
        dots={false}
        infinite
        autoplay={!pauseCarousel}
      >
        {movies.map((movie, key) => (
          <div key={key}>
            <MovieBanner
              movie={movie}
              pauseCarousel={pauseCarousel}
              setPauseCarousel={setPauseCarousel}
            />
          </div>
        ))}
      </Carousel>
    </div>
  );
}

export default GetCarousel;
