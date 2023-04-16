import React, { useRef, useEffect } from "react";
import "./register.css";
import { message } from "antd";
import logo from "../../assets/png/logo-color.png";
import { Link, useNavigate } from "react-router-dom";
import { registerUser } from "../../services/userService";

function Register() {
  const firstName = useRef();
  const lastName = useRef();
  const email = useRef();
  const password = useRef();

  const navigate = useNavigate();

  // handle register user will call registerUser from service and handle user registration
  const handleRegister = async (e) => {
    e.preventDefault();
    const userInfo = {
      name: firstName.current.value + " " + lastName.current.value,
      email: email.current.value,
      password: password.current.value,
    };

    try {
      console.log(firstName, lastName, email, password);
      console.log(userInfo.password);
      const response = await registerUser(userInfo);
      if (response.success) {
        // show message that uesr is registered
        message.success(response.message);
      } else {
        // show error message
        message.error(response.message);
      }
    } catch (error) {
      // show error message
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
      {/* <img
        className="position-absolute align-self-center"
        src={logo}
        alt="BookCine"
        style={{ height: "150px", width: "170px",margin:"0 auto"}}
      /> */}
      <div className="col">
        <div className="left-col-register h-100"></div>
      </div>
      <div className="col d-flex justify-content-center align-items-center">
        <div className="row w-75">
          <form onSubmit={handleRegister}>
            <div className="mb-3">
              <div className="d-flex flex-col mb-4">
                <div>
                  <label htmlFor="firstName" className="form-label">
                    First Name
                  </label>
                  <input
                    type="text"
                    className="form-control"
                    id="firstName"
                    ref={firstName}
                  />
                </div>
                <div className="ms-2">
                  <label htmlFor="lastName" className="form-label">
                    Last Name
                  </label>
                  <input
                    type="text"
                    className="form-control"
                    id="lastName"
                    ref={lastName}
                  />
                </div>
              </div>
              <label htmlFor="email" className="form-label">
                Email address
              </label>
              <input
                type="email"
                className="form-control"
                id="email"
                ref={email}
              />
              {/* <div id="" class="form-text text-primary">
                We'll never share your info with anyone else.
              </div> */}
            </div>
            <div className="mb-3">
              <label htmlFor="password" className="form-label">
                Password
              </label>
              <input
                type="password"
                className="form-control"
                id="password"
                ref={password}
              />
            </div>
            <div className="mb-3 form-check">
              <input type="checkbox" className="form-check-input" id="check" />
              <label className="form-check-label" htmlFor="check">
                Check me out
              </label>
            </div>
            <button className="btn btn-dark w-100" type="submit">
              Register
            </button>
            <p className="mt-2">
              Already have an account? Login
              <span className="text-primary">
                <Link to={"/login"}> Here </Link>
              </span>
            </p>
          </form>
        </div>
      </div>
    </div>
  );
}

export default Register;
