import { useState } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import "./App.css";
import Register from "./pages/Register/Register";
import Login from "./pages/Login/Login";
import Home from "./pages/Home/Home";
import ProtectedRoute from "./components/ProtectedRoute";
import { useSelector } from "react-redux";
import Navbar from "./components/Navbar";

function App() {
  const {loading }= useSelector((state) => state.loaders);
  return (
    <>
      {loading && (
        <div
          className="d-flex justify-content-center align-items-center position-fixed"
          style={{ inset: 0, background:"rgba(255,255,255,0.9)" }}
        >
          <div className="spinner-grow position-absolute text-danger" style={{height: "4rem", width: "4rem" }}>
            <span className="visually-hidden">Loading...</span>
          </div>
        </div>
      )}
      <BrowserRouter>
          <Navbar/>
        <Routes>
          <Route
            path="/"
            element={
              <ProtectedRoute>
                <Home />
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
