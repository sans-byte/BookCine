import React, { useRef } from "react";
import "./login.css";
import logo from "../../assets/png/logo-color.png";
import { Link } from "react-router-dom";

function Login() {
  const email = useRef();
  const password = useRef();

  const handleLogin = (e) => {
    e.preventDefault();
    // console.log(email.current.value);
  };
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
              alt=""
              srcset=""
              style={{ height: "150px", width: "170px" }}
            />
            <div className="ms-3">
              <h3 className="mb-2">Welcome</h3>
              <p>"Book your entertainment, hassle-free."</p>
            </div>
          </div>
          <form onSubmit={handleLogin}>
            <div class="mb-3">
              <label for="email" class="form-label">
                Email address / Phone
              </label>
              <input
                type="email"
                class="form-control"
                id="email"
                name="email"
                ref={email}
              />
              <div id="" class="form-text text-danger d-none">
                Enter your email
              </div>
            </div>
            <div class="mb-3">
              <label for="password" class="form-label">
                Password
              </label>
              <input
                type="password"
                class="form-control"
                id="password"
                name="password"
                ref={password}
              />
            </div>
            <div class="mb-3 form-check">
              <input type="checkbox" class="form-check-input" id="check" />
              <label class="form-check-label" for="check">
                Check me out
              </label>
            </div>
            <button className="btn btn-dark w-100" type="submit">
              Login
            </button>
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
