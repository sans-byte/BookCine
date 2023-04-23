import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import TheaterForm from "./TheaterForm";
import {
  deleteTheater,
  getAllTheatersByOwner,
} from "../../services/theaterService";
import { useDispatch, useSelector } from "react-redux";
import { Table, message } from "antd";
import { hideLoading, showLoading } from "../../redux/loaderSlice";
import { FaPencilAlt, FaTrashAlt } from "react-icons/fa";
import Shows from "./Shows/ShowsForm";
import ShowsForm from "./Shows/ShowsForm";

function TheatersListUser() {
  const [showTheaterForm, setShowTheaterForm] = useState(false);
  const [selectedTheater, setSelectedTheater] = useState(null);
  const [formType, setFormType] = useState("add");
  const [theaters, setTheaters] = useState([]);
  const [showShowsForm, setShowShowsForm] = useState(false);

  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { user } = useSelector((state) => state.users);

  // fetching all the theateres by owner from the database
  const getAllTheatersByOwnerData = async () => {
    try {
      dispatch(showLoading());
      console.log(user._id);
      const response = await getAllTheatersByOwner({ owner: user._id });
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

  // on page load we need to fetch the data of all the theaters already present

  const handleTheaterDelete = async (_id) => {
    // delete theater
    try {
      dispatch(showLoading());
      const response = await deleteTheater({ _id });
      if (response.success) {
        message.success(response.message);
        getAllTheatersByOwnerData();
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
    getAllTheatersByOwnerData();
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
      render: (text) => {
        return text ? (
          <div className="text-success">Approved</div>
        ) : (
          <div className="text-warning">Pending</div>
        );
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
                setSelectedTheater(record);
                setFormType("edit");
                setShowTheaterForm(true);
              }}
            >
              <FaPencilAlt />
            </button>
            <button
              className="btn btn-sm text-danger"
              onClick={(e) => {
                handleTheaterDelete(record._id);
              }}
            >
              <FaTrashAlt />
            </button>
            {record.isActive && (
              <button
                className="btn btn-sm btn-success text-white"
                onClick={() => {
                  setSelectedTheater(record);
                  setShowShowsForm(true);
                }}
              >
                Shows
              </button>
            )}
          </div>
        );
      },
    },
  ];

  return (
    <div>
      <div className="text-end container">
        <button
          className="btn btn-sm btn-primary"
          onClick={() => {
            setShowTheaterForm(true);
            setFormType("add");
          }}
        >
          Add Theater
        </button>
      </div>

      <div className="mt-2">
        <Table dataSource={theaters} columns={columns} />
      </div>
      <div>
        <TheaterForm
          showTheaterForm={showTheaterForm}
          setShowTheaterForm={setShowTheaterForm}
          setSelectedTheater={setSelectedTheater}
          selectedTheater={selectedTheater}
          formType={formType}
          getAllTheatersByOwnerData={getAllTheatersByOwnerData}
        />
      </div>
      {showShowsForm && (
        <ShowsForm
          showShowsForm={showShowsForm}
          setShowShowsForm={setShowShowsForm}
          selectedTheater={selectedTheater}
        />
      )}
    </div>
  );
}

export default TheatersListUser;
