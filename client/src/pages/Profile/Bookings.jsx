import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { hideLoading, showLoading } from "../../redux/loaderSlice";
import { getBookingsOfUser } from "../../services/bookingService";
import { Divider, message } from "antd";
import moment from "moment";

function Bookings() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [bookings, setBookings] = useState([]);
  const { user } = useSelector((state) => state.users);

  //on page load we need the booking data of the user

  const getBookingData = async () => {
    try {
      dispatch(showLoading());
      const response = await getBookingsOfUser();
      if (response.success) {
        setBookings(response.data);
      } else {
        message.error(response.message);
      }
      dispatch(hideLoading());
    } catch (error) {
      message.error(error.message);
      dispatch(hideLoading());
    }
  };

  useEffect(() => {
    getBookingData();
  }, []);

  return (
    <div>
      <Divider orientation="left" className="fs-2">
        Bookings
      </Divider>
      <div className="container">
        {bookings.map((booking, key) => (
          <div className="card mb-3" style={{ maxWidth: "500px" }}>
            <div className="row g-0">
              <div className="col-md-4">
                <img
                  src={booking.show.movie.moviePosterURL}
                  className="img-fluid rounded-start"
                  alt="..."
                />
              </div>
              <div className="col-md-8">
                <div className="card-body">
                  <div className="d-flex justify-content-between mb-2">
                    <h5 className="card-title fw-bolder mb-2">
                      {booking.show.movie.movieName}
                    </h5>
                    <p>{booking.seats.length * booking.show.price} Rs</p>
                  </div>
                  <p className="card-text">
                    Seat no -{" "}
                    {booking.seats.map((seat) => (
                      <span className="m-1 border rounded p-2">{seat}</span>
                    ))}
                  </p>
                  <p>
                    Date/Time - {booking.show.date} /{" "}
                    {moment(booking.show.time, "HH:mm").format("hh:mm A")}
                  </p>
                  <p>Theater - {booking.show.theater.name}</p>
                  <p className=""> {booking.show.theater.address} </p>
                  <p className="card-text mt-auto">
                    <small className="text-body-secondary">Welcome</small>
                  </p>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Bookings;
