import { useDispatch, useSelector } from "react-redux";
import { Form, useNavigate, useParams } from "react-router-dom";
import React, { useEffect, useState } from "react";
import { hideLoading, showLoading } from "../../redux/loaderSlice";
import { Button, Input, message, Modal, Space } from "antd";
import { getShowById } from "../../services/showService";
import Navbar from "../../components/Navbar/Navbar";
import moment from "moment";
import { bookShowTickets } from "../../services/bookingService";

function BookShow() {
  const [show, setShow] = useState();
  const params = useParams();
  const dispatch = useDispatch();
  const [selectedSeats, setSelectedSeats] = useState([]);
  const navigate = useNavigate();
  const { user } = useSelector((state) => state.users);

  const getShowByID = async () => {
    try {
      dispatch(showLoading());
      const response = await getShowById({ _id: params.id });
      if (response.success) {
        setShow(response.data);
      } else {
        message.error(response.message);
      }
      dispatch(hideLoading());
    } catch (error) {
      message.error(error.message);
      dispatch(hideLoading());
    }
  };

  // display seats
  const getSeats = () => {
    const columns = 12;
    const totalSeats = show?.seats;
    const rows = Math.ceil(totalSeats / columns);
    // return hmtl boxes for the seats
    return (
      <div className="d-flex row container w-50 m-auto border p-4 mt-2">
        {Array.from(Array(rows).keys()).map((seats, index) => {
          return (
            <div className="d-flex row gx-2 gy-2  justify-content-center">
              {Array.from(Array(columns).keys()).map((column, index) => {
                let selectedSeatClassChange = "notselected";
                const seatNumber = seats * columns + column + 1;
                if (selectedSeats.includes(seatNumber)) {
                  selectedSeatClassChange = "selected";
                }
                if (show.bookedSeats.includes(seatNumber)) {
                  selectedSeatClassChange = "booked";
                }

                return (
                  seatNumber <= totalSeats && (
                    <div
                      className={`d-flex justify-content-center align-items-center col-1 border rounded m-1 ${
                        selectedSeatClassChange === "selected"
                          ? "btn btn-success"
                          : selectedSeatClassChange === "notselected"
                          ? "btn btn-outline-success"
                          : "bg-dark text-white"
                      }`}
                      style={{
                        height: "40px",
                        width: "40px",
                      }}
                      onClick={() => {
                        const seatNumber = seats * columns + column + 1;
                        if (selectedSeats.includes(seatNumber)) {
                          setSelectedSeats(
                            selectedSeats.filter((s) => s !== seatNumber)
                          );
                        } else {
                          setSelectedSeats([...selectedSeats, seatNumber]);
                        }
                      }}
                    >
                      <h6 className=" p-2 m-2">
                        {seats * columns + column + 1}
                      </h6>
                    </div>
                  )
                );
              })}
            </div>
          );
        })}
      </div>
    );
  };

  // onsubmit payment book tickets of the user
  const bookTickets = async () => {
    try {
      dispatch(showLoading());
      const response = await bookShowTickets({
        show: params.id,
        seats: selectedSeats,
        user: user._id,
      });
      if (response.success) {
        message.success(response.message);
        navigate("/profile");
      } else {
        message.error(response.error);
      }
      dispatch(hideLoading());
    } catch (error) {
      message.error(error.message);
      dispatch(hideLoading());
    }
  };

  useEffect(() => {
    getShowByID();
  }, []);

  let totalAmount = selectedSeats.length * show?.price;

  const [isModalOpen, setIsModalOpen] = useState(false);
  const showModal = () => {
    setIsModalOpen(true);
  };
  const handleOk = () => {
    setIsModalOpen(false);
    bookTickets();
  };
  const handleCancel = () => {
    setIsModalOpen(false);
  };

  return (
    <div>
      <div className="">
        <Navbar />
      </div>
      <div>
        {/* show information */}
        <div className="bg-dark p-4 text-white ">
          <div className="container d-flex justify-content-between align-items-center">
            <div>{show?.theater.name}</div>
            <div className="fs-3">{show?.movie.movieName}</div>
            <div className="d-flex">
              {moment(show?.date).format("MMM Do")} /
              <p>{moment(show?.time, "HH:mm").format("hh:mm A")}</p>
            </div>
          </div>
        </div>
        {/* show  seats */}
        {show && (
          <div className="">
            <div className="">{getSeats()}</div>
          </div>
        )}
        <div>
          {/* stripe not working fix later for now use modal popup */}
          {/* <StripeCheckout
            token={onToken}
            amount={selectedSeats.length * show?.price * 100}
            stripeKey="pk_test_51N02yWSH4N83UesqoFRS87XYLocXoa25LG5JYhE5N6LCfqhF3F80fhiKbbX62Z0xXZjj1NVKybhf09NP0zA0cQYb00NyO0ZXCm"
          >
            <button className="btn btn-primary m-2">Book Now</button>
          </StripeCheckout> */}
          <div className="text-center">
            <button className="btn btn-primary m-2 " onClick={showModal}>
              Book Now
            </button>
          </div>
          <Modal
            title={`Total Amount : ${totalAmount}`}
            open={isModalOpen}
            onOk={handleOk}
            onCancel={handleCancel}
            okText={"Pay"}
          >
            <form>
              <div className="mb-3">
                <label htmlForfor="card" className="form-label">
                  Card Number
                </label>
                <input
                  type="text"
                  className="form-control"
                  id="card"
                  placeholder="000 000 000 000"
                />
                <div id="emailHelp" className="form-text"></div>
              </div>
              <div className="mb-3 row">
                <div className="col">
                  <label htmlFor="cvv" className="form-label">
                    CVV
                  </label>
                  <input
                    type="number"
                    className="form-control"
                    id="cvv"
                    placeholder="123"
                  />
                </div>
                <div className="col">
                  <label htmlFor="expiry" className="form-label">
                    Valid upto
                  </label>
                  <input
                    type="date"
                    className="form-control"
                    id="expiry"
                    placeholder=""
                  />
                </div>
              </div>
            </form>
          </Modal>
        </div>
      </div>
    </div>
  );
}

export default BookShow;
