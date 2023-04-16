import React, { useEffect, useState } from "react";
import { getCurrentUser } from "../services/userService";
import { message } from "antd";
import { useNavigate } from "react-router-dom";

function ProtectedRoute({ children }) {
  const [user, setUser] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    if (localStorage.getItem("token")) {
      getCurrentUserData();
    } else {
      message.error("Please Login First");
      navigate("/login");
    }
  }, []);

  const getCurrentUserData = async () => {
    try {
      const response = await getCurrentUser();
      if (response.success) {
        setUser(response.data);
      } else {
        message.error(response.response.data.message);
        setUser(null);
      }
    } catch (error) {
    // message.error(error);
      setUser(null);
    }
  };

  return (
    user && (
      <div>
        {user.name}
        {children}
      </div>
    )
  );
}

export default ProtectedRoute;
