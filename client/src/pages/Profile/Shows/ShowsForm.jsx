import { useDispatch } from "react-redux";
import React, { useState } from "react";
import "./ShowsForm.css";
import moment from "moment";
import {
  Button,
  Modal,
  Table,
  Drawer,
  theme,
  Form,
  Row,
  Col,
  Input,
  Select,
  message,
} from "antd";
import { getAllMovies } from "../../../services/movieService";
import { hideLoading, showLoading } from "../../../redux/loaderSlice";
import {
  addShow,
  deleteShow,
  getAllShowsByTheater,
} from "../../../services/showService";
import { FaPencilAlt, FaTrashAlt } from "react-icons/fa";

function ShowsForm({ selectedTheater, showShowsForm, setShowShowsForm }) {
  const [confirmLoading, setConfirmLoading] = useState(false);
  const [showForm, setShowForm] = useState(false);
  const [shows, setShows] = useState([]);
  const [movies, setMovies] = useState([]);

  // Drawer config

  const containerStyle = {
    position: "relative",
    overflow: "hidden",
    height: 400,
  };

  //===============

  const handleOk = () => {
    setConfirmLoading(true);
    setTimeout(() => {
      setShowShowsForm(false);
      setConfirmLoading(false);
    }, 2000);
  };
  const handleCancel = () => {
    setShowShowsForm(false);
  };

  const dispatch = useDispatch();

  // get data of all the movies
  // get data of all shows in a theater
  const getData = async () => {
    try {
      dispatch(showLoading());
      const moviesResponse = await getAllMovies();
      if (moviesResponse.success) {
        setMovies(moviesResponse.data);
      } else {
        message.error(moviesResponse.error);
      }

      const showsResponse = await getAllShowsByTheater({
        theaterId: selectedTheater._id,
      });
      if (showsResponse.success) {
        setShows(showsResponse.data);
      } else {
        message.error(showsResponse.error);
      }
      dispatch(hideLoading());
    } catch (error) {
      message.error(response.error);
      dispatch(hideLoading());
    }
  };

  //handle add show to the theater
  const handleAddShow = async (values) => {
    try {
      console.log(values);
      dispatch(showLoading());
      const response = await addShow({
        ...values,
        theater: selectedTheater._id,
      });
      if (response.success) {
        message.success(response.message);
        setShowForm(false);
        getData();
      } else {
        message.error(response.error);
      }
      dispatch(hideLoading());
    } catch (error) {
      message.error(response.error);
      dispatch(hideLoading());
    }
  };

  //delete show
  const handleShowDelete = async (showId) => {
    try {
      dispatch(showLoading());
      const response = await deleteShow({
        showId,
      });
      if (response.success) {
        message.success(response.message);
        getData();
      } else {
        message.error(response.error);
      }
      dispatch(hideLoading());
    } catch (error) {
      message.error(response.error);
      dispatch(hideLoading());
    }
  };

  useState(() => {
    getData();
  }, []);

  // Columns data for AntD table
  const column = [
    {
      title: "Show",
      dataIndex: "name",
    },
    {
      title: "Date",
      dataIndex: "date",
      render: (text, record) => {
        return moment(text).format("MMMM Do YYYY");
      },
    },
    {
      title: "Time",
      dataIndex: "time",
    },

    {
      title: "Movie",
      dataIndex: "movie",
      render: (text, record) => {
        return record.movie.movieName;
      },
    },
    {
      title: "Price",
      dataIndex: "price",
    },
    {
      title: "Total seats",
      dataIndex: "seats",
    },
    {
      title: "Available seats",
      dataIndex: "availableSeats",
      render: (text, record) => {
        return record.seats - record.bookedSeats.length;
      },
    },
    {
      title: "Actions",
      dataIndex: "actions",
      render: (text, record) => {
        return (
          <div>
            {record.bookedSeats.length === 0 && (
              <>
                <button className="btn-sm btn text-primary" onClick={() => {}}>
                  <FaPencilAlt />
                </button>
                <button
                  className="btn btn-sm text-danger"
                  onClick={(e) => {
                    handleShowDelete(record._id);
                  }}
                >
                  <FaTrashAlt />
                </button>
              </>
            )}
          </div>
        );
      },
    },
  ];

  return (
    <div>
      <>
        <Modal
          open={showShowsForm}
          onOk={handleOk}
          confirmLoading={confirmLoading}
          onCancel={handleCancel}
          width={"80%"}
        >
          <div style={containerStyle}>
            <div>
              <h5>Theater : {selectedTheater.name}</h5>
              <hr />
              <div className="d-flex justify-content-between">
                <h6>Shows</h6>
                <button
                  className="btn btn-sm btn-primary"
                  onClick={() => setShowForm(true)}
                >
                  Add Shows
                </button>
              </div>
            </div>
            <div>
              {!showForm && (
                <Table
                  columns={column}
                  dataSource={shows}
                  className="mt-1"
                  pagination={{ pageSize: 3 }}
                  style={{ fontSize: "10px" }}
                ></Table>
              )}
            </div>
            {/* // Drawer for the form of adding the shows */}
            <Drawer
              title="Basic Drawer"
              placement="right"
              open={showForm}
              onClose={() => setShowForm(false)}
              getContainer={false}
              width={"100%"}
              height={500}
            >
              <Form
                layout="vertical"
                // initialValues={selectedTheater}
                confirmLoading={true}
                onFinish={handleAddShow}
              >
                <Row gutter={16}>
                  <Col span={12}>
                    <Form.Item
                      name="name"
                      label="Show"
                      rules={[
                        {
                          required: true,
                          message: "Please enter Show's name",
                        },
                      ]}
                    >
                      <Input placeholder="Please enter show name" type="text" />
                    </Form.Item>
                  </Col>

                  <Col span={12}>
                    <Form.Item
                      name="date"
                      label="Date"
                      rules={[
                        {
                          required: true,
                          message: "Please enter date",
                        },
                      ]}
                    >
                      <Input
                        style={{
                          width: "100%",
                        }}
                        placeholder="Please enter date"
                        type="date"
                        min={new Date().toISOString().split("T")[0]}
                      />
                    </Form.Item>
                  </Col>
                </Row>
                <Row gutter={16}>
                  <Col span={12}>
                    <Form.Item
                      name="time"
                      label="Time"
                      rules={[
                        {
                          required: true,
                          message: "Please enter time",
                        },
                      ]}
                    >
                      <Input
                        style={{
                          width: "100%",
                        }}
                        placeholder="Please enter time"
                        type="time"
                      />
                    </Form.Item>
                  </Col>
                  <Col span={12}>
                    <Form.Item
                      name="movie"
                      label="Movie"
                      rules={[
                        {
                          required: true,
                          message: "Please choose the movie",
                        },
                      ]}
                    >
                      <Select placeholder="Please select the movie">
                        {movies.map((movie, key) => (
                          <Option key={key} value={movie._id}>
                            {movie.movieName}
                          </Option>
                        ))}
                      </Select>
                    </Form.Item>
                  </Col>
                </Row>
                <Row gutter={16}>
                  <Col span={12}>
                    <Form.Item
                      name="price"
                      label="Ticket Price"
                      rules={[
                        {
                          required: true,
                          message: "Please enter price",
                        },
                      ]}
                    >
                      <Input
                        style={{
                          width: "100%",
                        }}
                        placeholder="Please enter price"
                        type="number"
                        addonBefore="₹"
                      />
                    </Form.Item>
                  </Col>
                  <Col span={12}>
                    <Form.Item
                      name="seats"
                      label="Seats"
                      rules={[
                        {
                          required: true,
                          message: "Please enter total seats",
                        },
                      ]}
                    >
                      <Input
                        style={{
                          width: "100%",
                        }}
                        placeholder="Please enter seats"
                        type="number"
                      />
                    </Form.Item>
                  </Col>
                </Row>
                <Button type="primary" htmlType="sumbit">
                  Submit
                </Button>
              </Form>
            </Drawer>
          </div>
        </Modal>
      </>
    </div>
  );
}

export default ShowsForm;
