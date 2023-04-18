import React, { useEffect, useRef } from "react";
import "./login.css";
import logo from "../../assets/png/logo-color.png";
import { Link, useNavigate } from "react-router-dom";
import { loginUser } from "../../services/userService";
import { message } from "antd";
import { hideLoading, showLoading } from "../../redux/loaderSlice";
import { useDispatch } from "react-redux";

function Login() {
  const email = useRef();
  const password = useRef();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const handleLogin = async (e) => {
    e.preventDefault();
    const user = {
      email: email.current.value,
      password: password.current.value,
    };
    try {
      dispatch(showLoading());
      const response = await loginUser(user);
      dispatch(hideLoading());
      if (response.success) {
        message.success(response.message);
        localStorage.setItem("token", response.data);
        window.location.href = "/";
        // navigate("/")
      } else {
        message.error(response.message);
      }
    } catch (error) {
      dispatch(hideLoading());
      message.error(error.message);
    }
  };

  useEffect(() => {
    if (localStorage.getItem("token")) {
      navigate("/");
    }
  }, []);
  return (
    <div className="row vw-100 vh-100">
      <div className="col">
        <div className="left-col h-100"></div>
      </div>
      <div className="col d-flex justify-content-center align-items-center">
        <div className="row w-75">
          <div className="d-flex mb-4 align-items-center">
            <img
              src={logo}
              alt="BookCine"
              style={{ height: "150px", width: "170px" }}
            />
            <div className="ms-3">
              <h3 className="mb-2">Welcome</h3>
              <p>"Book your entertainment, hassle-free."</p>
            </div>
          </div>
          <form onSubmit={handleLogin}>
            <div className="mb-3">
              <label htmlFor="email" className="form-label">
                Email address / Phone
              </label>
              <input
                type="email"
                className="form-control"
                id="email"
                name="email"
                ref={email}
              />
              <div id="" className="form-text text-danger d-none">
                Enter your email
              </div>
            </div>
            <div className="mb-3">
              <label htmlFor="password" className="form-label">
                Password
              </label>
              <input
                type="password"
                className="form-control"
                id="password"
                name="password"
                ref={password}
              />
            </div>
            <div className="mb-3 form-check">
              <input type="checkbox" className="form-check-input" id="check" />
              <label className="form-check-label" htmlFor="check">
                Check me out
              </label>
            </div>
            <button className="btn btn-dark w-100">Login</button>
            <p className="mt-2">
              Not a member? Join{" "}
              <span className="text-primary">
                <Link to={"/register"}> Here </Link>
              </span>
            </p>
          </form>
        </div>
      </div>
    </div>
  );
}

export default Login;
