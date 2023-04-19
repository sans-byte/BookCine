import React, { useEffect, useState } from "react";
import { getAllTheaters, updateTheater } from "../../services/theaterService";
import { useDispatch, useSelector } from "react-redux";
import { Table, message } from "antd";
import { hideLoading, showLoading } from "../../redux/loaderSlice";

function TheatersList() {
  const dispatch = useDispatch();

  const [theaters, setTheaters] = useState([]);

  // fetching all the theateres by owner from the database
  const getAllTheatersData = async () => {
    try {
      dispatch(showLoading());
      const response = await getAllTheaters();
      if (response.success) {
        setTheaters(response.data);
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

  // change the status of the theater
  const changeStatus = async (theater) => {
    try {
      dispatch(showLoading());
      const response = await updateTheater({
        _id: theater._id,
        ...theater,
        isActive: !theater.isActive,
      });
      if (response.success) {
        message.success(response.message);
        getAllTheatersData();
      } else {
        message.error(response.message);
      }
      dispatch(hideLoading());
    } catch (error) {
      dispatch(hideLoading());
      message.error(error.message);
    }
  };

  useState(() => {
    getAllTheatersData();
  }, []);

  const columns = [
    {
      title: "Theater Name",
      dataIndex: "name",
      key: "name",
    },
    {
      title: "Screens",
      dataIndex: "screens",
      key: "screens",
    },
    {
      title: "Address",
      dataIndex: "address",
      key: "address",
    },
    {
      title: "Phone Number",
      dataIndex: "phone",
      key: "phoneNumber",
    },
    {
      title: "Email",
      dataIndex: "email",
      key: "email",
    },
    {
      title: "City",
      dataIndex: "city",
      key: "city",
    },
    {
      title: "State",
      dataIndex: "state",
      key: "state",
    },
    {
      title: "Status",
      dataIndex: "isActive",
      key: "status",
      render: (text, record) => {
        if (text) {
          return "Approved";
        } else {
          return "Pending";
        }
      },
    },
    {
      title: "Action",
      dataIndex: "action",
      key: "action",
      render: (text, record) => {
        return (
          <div>
            {record.isActive ? (
              <div
                className="text-danger text-decoration-underline"
                style={{ cursor: "pointer" }}
                onClick={() => {
                  changeStatus(record);
                }}
              >
                Block
              </div>
            ) : (
              <div
                className="text-success text-decoration-underline"
                style={{ cursor: "pointer" }}
                onClick={() => {
                  changeStatus(record);
                }}
              >
                Approve
              </div>
            )}
          </div>
        );
      },
    },
  ];

  return (
    <div className="mt-2">
      <Table dataSource={theaters} columns={columns} />
    </div>
  );
}

export default TheatersList;
