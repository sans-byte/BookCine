import React from "react";
import { GiTicket } from "react-icons/gi";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

function Navbar() {
  const user = useSelector((state) => state.users);
  const navigate = useNavigate();

  const handleLogOut = () => {
    localStorage.removeItem("token");
    navigate("/login");
  };

  const handleProfile = () => {
    if (user.user.isAdmin) {
      navigate("/admin");
    } else {
      navigate("/profile");
    }
  };

  return (
    <div className="">
      <nav className="navbar navbar-expand-lg navbar-light bg-danger">
        <div className="container-fluid">
          <div className="d-flex justify-content-center align-items-center">
            <div
              className="navbar-brand text-white"
              onClick={() => {
                navigate("/");
              }}
              style={{ zIndex: 2, cursor: "pointer" }}
            >
              BOOKCINE
            </div>
            <GiTicket
              className="position-absolute fs-1"
              style={{ zIndex: 1 }}
            />
          </div>
          <button
            className="navbar-toggler"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#navbarSupportedContent"
            aria-controls="navbarSupportedContent"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span className="navbar-toggler-icon"></span>
          </button>
          <div className="collapse navbar-collapse" id="navbarSupportedContent">
            <form className="d-flex w-50">
              <input
                className="form-control w-100"
                type="search"
                placeholder="Search.."
                aria-label="Search"
              />
            </form>
            <ul className="navbar-nav mb-2 mb-lg-0 w-50">
              <li className="nav-item">
                <a className="nav-link active" aria-current="page" href="#">
                  Home
                </a>
              </li>
              <li className="nav-item">
                <a className="nav-link" href="#">
                  Movies
                </a>
              </li>
            </ul>
            <div className=" mb-2 mb-lg-0" style={{ marginRight: "5rem" }}>
              {user.user ? (
                <div className="nav-item dropdown ">
                  <a
                    className="nav-link dropdown-toggle text-white"
                    href="#"
                    id="navbarDropdown"
                    role="button"
                    data-bs-toggle="dropdown"
                    aria-expanded="false"
                  >
                    {user.user.name}
                  </a>
                  <ul
                    className="dropdown-menu"
                    aria-labelledby="navbarDropdown"
                  >
                    <li>
                      <button className="dropdown-item" onClick={handleProfile}>
                        Profile
                      </button>
                    </li>
                    <li>
                      <a className="dropdown-item" href="#">
                        Another action
                      </a>
                    </li>
                    <li>
                      <button
                        className="dropdown-item bg-warning"
                        onClick={handleLogOut}
                      >
                        logout
                      </button>
                    </li>
                  </ul>
                </div>
              ) : (
                <button className="btn btn-warning">login</button>
              )}
            </div>
          </div>
        </div>
      </nav>
    </div>
  );
}

export default Navbar;
