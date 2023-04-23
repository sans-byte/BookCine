import { Badge } from "antd";
import moment from "moment";
import React, { useRef, useState } from "react";
import { FaRegPlayCircle } from "react-icons/fa";

function MovieBanner({ movie, pauseCarousel, setPauseCarousel }) {
  const videoRef = useRef();
  const [isPlaying, setIsPlaying] = useState(false);

  return (
    <div
      className="p-5"
      style={{
        backgroundImage:
          "radial-gradient(circle, #c66e6e, #915256, #5f373d, #311f23, #000000)",
      }}
    >
      <Badge.Ribbon text={<div>{movie.movieGenre}</div>} color="red" />
      <p className="text-white ps-2 fs-1 fw-bold">{movie.movieName}</p>
      <Badge.Ribbon />

      <p className="text-white ps-2 fs-6">
        <span>
          {Math.floor(movie.movieDuration / 60)}hrs {movie.movieDuration % 60}
          mins /
        </span>
        <span> {moment(movie.movieReleaseDate).format("YYYY")}</span> /{" "}
        <span>{movie.movieLanguage}</span>
      </p>
      <hr className="text-white" />
      <div
        className="row d-flex justify-content-end align-items-center"
        style={{
          backgroundImage:
            "radial-gradient(circle, #c66e6e, #915256, #5f373d, #311f23, #000000)",
        }}
      >
        <div className="col-3 d-flex justify-content-end">
          <div className=" w-100 h-100 d-flex justify-content-end">
            <img
              className="w-100 h-100"
              src={movie.moviePosterURL}
              alt="Banner"
            />
          </div>
        </div>
        <div className="col-9 d-flex justify-content-center p-4 position-relative align-items-center">
          <video
            src={movie.movieTrailerURL}
            id="carouselVideo"
            ref={videoRef}
            onClick={() => {
              setIsPlaying(false);
              videoRef.current.pause();
            }}
            controls={false}
            onPlay={() => {
              setPauseCarousel(true);
              setIsPlaying(true);
            }}
            onPause={() => {
              setPauseCarousel(false);
              setIsPlaying(false);
            }}
            onEnded={() => {
              setPauseCarousel(false);
              setIsPlaying(false);
            }}
          ></video>
          {!isPlaying && (
            <div
              className="position-absolute text-white"
              style={{ cursor: "pointer", fontSize: "5rem" }}
              onClick={() => {
                //need to play above video onclick
                videoRef.current.play();
              }}
            >
              <FaRegPlayCircle />
            </div>
          )}
        </div>
      </div>
      <div className="ps-2 ">
        <div className="text-white fs-4">{movie.movieGenre}</div>
        <hr className="text-white" />
        <p className="text-white fs-6"> {movie.movieDescription}</p>
      </div>
    </div>
  );
}

export default MovieBanner;
