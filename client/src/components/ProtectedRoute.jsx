import React, { useEffect, useState } from "react";
import { getCurrentUser } from "../services/userService";
import { message } from "antd";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { setUser } from "../redux/userSlice";
import { hideLoading, showLoading } from "../redux/loaderSlice";

function ProtectedRoute({ children }) {
  const { user } = useSelector((state) => state.users);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  // getting data of the current user and cheking if it exists and session is not expired
  const getCurrentUserData = async () => {
    try {
      dispatch(showLoading());
      const response = await getCurrentUser();
      dispatch(hideLoading());

      if (response.success) {
        dispatch(setUser(response.data));
      } else {
        message.error(response.response.data.message);
        dispatch(setUser(null));
      }
    } catch (error) {
      dispatch(hideLoading());
      dispatch(setUser(null));
    }
  };

  useEffect(() => {
    if (localStorage.getItem("token")) {
      getCurrentUserData();
    } else {
      message.error("Please Login First");
      navigate("/login");
    }
  }, []);

  return (
    user && (
      <div>
        {children}
      </div>
    )
  );
}

export default ProtectedRoute;
