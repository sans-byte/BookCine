import { useState } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import "./App.css";
import Register from "./pages/Register/Register";
import Login from "./pages/Login/Login";
import Home from "./pages/Home/Home";
import ProtectedRoute from "./components/ProtectedRoute";
import { useSelector } from "react-redux";
import Navbar from "./components/Navbar/Navbar";
import Profile from "./pages/Profile/Profile";
import Admin from "./pages/Admin/Admin";
import TheatersForMovie from "./pages/Users/TheatersForMovie";
import BookShow from "./pages/Bookshow/BookShow";

function App() {
  const { loading } = useSelector((state) => state.loaders);
  return (
    <>
      {loading && (
        <div
          className="d-flex justify-content-center align-items-center position-fixed"
          style={{
            inset: 0,
            background: "rgba(255,255,255,0.9)",
            zIndex: "999",
          }}
        >
          <div
            className="spinner-grow position-absolute text-danger"
            style={{ height: "4rem", width: "4rem" }}
          >
            <span className="visually-hidden">Loading...</span>
          </div>
        </div>
      )}
      <BrowserRouter>
        <Routes>
          <Route
            path="/"
            element={
              <ProtectedRoute>
                <Home />
              </ProtectedRoute>
            }
          />
          <Route
            path="/profile"
            element={
              <ProtectedRoute>
                <Profile />
              </ProtectedRoute>
            }
          />
          <Route
            path="/Admin"
            element={
              <ProtectedRoute>
                <Admin />
              </ProtectedRoute>
            }
          />
          <Route
            path="/movie/:id"
            element={
              <ProtectedRoute>
                <TheatersForMovie />
              </ProtectedRoute>
            }
          />
          <Route
            path="/bookshow/:id"
            element={
              <ProtectedRoute>
                <BookShow />
              </ProtectedRoute>
            }
          />

          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
