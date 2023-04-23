import React, { useEffect, useState } from "react";
import { GiTicket } from "react-icons/gi";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { getAllMovies } from "../../services/movieService";
import { message } from "antd";
import { hideLoading, showLoading } from "../../redux/loaderSlice";
import "./Navbar.css";

function Navbar() {
  const user = useSelector((state) => state.users);
  const navigate = useNavigate();

  const [movies, setMovies] = useState([]);
  const [searchTerm, setSearchName] = useState();
  const dispatch = useDispatch();

  // fetching the data about the movie currently in database
  const getAllMoviesData = async () => {
    try {
      dispatch(showLoading());
      const response = await getAllMovies();
      if (response.success) {
        setMovies(response.data);
      } else {
        message.error(response.message);
      }
      dispatch(hideLoading());
    } catch (error) {
      dispatch(hideLoading());
      message.error(error.message);
    }
  };

  // on navbar load we need to fetch the data of all the movies already present

  useEffect(() => {
    getAllMoviesData();
  }, []);

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
            <div className="position-relative w-50">
              <form className="d-flex w-100">
                <input
                  className="form-control w-100"
                  type="search"
                  placeholder="Search.."
                  aria-label="Search"
                  onChange={(e) => setSearchName(e.target.value)}
                />
              </form>
              {/* Dropdown menu when searched keywords */}
              {searchTerm && (
                <div className="p-2 position-absolute text-white w-100 dropdown-search bg-dark">
                  {movies
                    .filter((movie) => {
                      //show only those movie whose name contains the searched keyword
                      const searchValue = searchTerm.toLowerCase();
                      const movieName = movie.movieName.toLowerCase();

                      return movieName.includes(searchValue);
                    })
                    .map((movie) => (
                      <div
                        className="p-1 w-100 border-bottom border-white"
                        onChange={() => {}}
                      >
                        {movie.movieName}
                      </div>
                    ))}
                </div>
              )}
            </div>
            <ul className="navbar-nav mb-2 mb-lg-0 w-50">
              <li className="nav-item">
                <Link to="/" className="nav-link active" aria-current="page">
                  Home
                </Link>
              </li>
              <li className="nav-item">
                <a className="nav-link" href="/#movies_section">
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
