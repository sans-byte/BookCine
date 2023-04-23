import React, { useEffect, useState } from "react";
import Navbar from "../../components/Navbar/Navbar";
import { DatePicker, Divider, Form, Input, Space, message } from "antd";
import moment from "moment";
import { useDispatch } from "react-redux";
import { hideLoading, showLoading } from "../../redux/loaderSlice";
import { useNavigate, useParams } from "react-router-dom";
import { getMovieById } from "../../services/movieService";
import { getAllTheatersByMovieAndDate } from "../../services/theaterService";

function TheatersForMovie() {
  //======================GET Movie ======================
  const [movie, setMovie] = useState();
  const [theaters, setTheaters] = useState([]);
  const dispatch = useDispatch();
  const param = useParams();
  const navigate = useNavigate();

  //extract the date from the url
  const tempdate = new URLSearchParams(window.location.search).get("date");
  const [date, setDate] = useState(tempdate || moment().format("YYYY-MM-DD"));

  // fetching the data about the movie from the database wrt ID
  const getAllMovieData = async () => {
    try {
      dispatch(showLoading());
      const response = await getMovieById(param.id);
      if (response.success) {
        setMovie(response.data);
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

  //fetch data of all theaters by movie and date

  const getTheaterByMovie = async () => {
    try {
      dispatch(showLoading());
      const response = await getAllTheatersByMovieAndDate({
        date,
        movie: param.id,
      });
      if (response.success) {
        setTheaters(response.data);
        console.log(response.data);
      }
      dispatch(hideLoading());
    } catch (error) {
      message.error(error.message);
      dispatch(hideLoading());
    }
  };

  // on page load we need to fetch the data of movie clicked on
  useEffect(() => {
    getAllMovieData();
  }, [date]);

  useEffect(() => {
    getTheaterByMovie();
  }, [date]);

  //======================================================

  // onChanging the date navigate to the url with the selected date giving date as query string

  const onChange = (e) => {
    setDate(e.target.value);
    navigate(`/movie/${movie._id}?date=${e.target.value}`);
  };

  return (
    <div>
      <div>
        <Navbar />
      </div>
      <div className="w-100 px-3 py-5 bg-dark text-white">
        <div className="container d-flex justify-content-between align-items-center ">
          <div>
            <div className="fs-3 fw-bolder">
              {movie?.movieName} - <span>{movie?.movieLanguage}</span>
            </div>
            <div>
              Release Date -
              {moment(movie?.movieReleaseDate).format("YYYY Do MMM")}
            </div>
            <div> Genre - {movie?.movieGenre} </div>
          </div>
          <div className="">
            {/* Date picker */}
            {/* Has some bug with the default pick */}
            {/* <Space direction="vertical">
              <DatePicker
                className=""
                defaultValue={moment(date)}
                format={"YYYY-MM-DD"}
                disabledDate={(current) => {
                  return current && current.valueOf() < Date.now();
                }}
                onChange={onChange}
              ></DatePicker>
            </Space> */}
            <Form>
              <Form.Item>
                <Input
                  type="date"
                  min={moment().format("YYYY-MM-DD")}
                  value={date}
                  onChange={onChange}
                ></Input>
              </Form.Item>
            </Form>
          </div>
        </div>
      </div>
      <Divider className="fs-3 fw-bolder" orientation="left">
        Theaters
      </Divider>
      <div className="container mt-4">
        {theaters.map((theater) => (
          <div className="border-bottom border-dark p-2">
            <div className="d-flex align-items-center justify-content-between ">
              <h5>{theater.name}</h5>
              <p>
                {theater.address} ,{theater.city},{theater.state}
              </p>
            </div>
            <div className="d-flex justify-content-start align-items-center">
              {theater.shows
                .sort(
                  (a, b) => moment(a.time, "HH:mm") - moment(b.time, "HH:mm")
                )
                .map((show) => (
                  <div
                    className="mx-2 btn btn-outline-dark btn-sm my-1"
                    onClick={() => navigate(`/bookshow/${show._id}`)}
                  >
                    {moment(show.time, "HH:mm").format("hh:mm A")}
                  </div>
                ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default TheatersForMovie;
