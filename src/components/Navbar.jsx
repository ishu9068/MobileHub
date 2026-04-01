import React, { useState } from "react";
import logo from "../assets/logo.png";
import { Link, useNavigate } from "react-router-dom";

const Navbar = ({
  theme,
  setTheme,
  goProducts,
  goAbout,
  goServices,
  goContact,
}) => {
  const [open, setOpen] = useState(false);
  const [profileOpen, setProfileOpen] = useState(false);

  const navigate = useNavigate();

  const toggleTheme = () => {
    setTheme(theme === "dark" ? "light" : "dark");
  };

  const user = JSON.parse(localStorage.getItem("user"));

  //  LOGOUT FUNCTION
  const handleLogout = () => {
    localStorage.removeItem("user");
    localStorage.removeItem("token"); 

    setProfileOpen(false);
    navigate("/");
  };

  return (
    <nav
      className={`navbar navbar-expand-lg px-3 ${
        theme === "dark" ? "navbar-dark bg-dark" : "navbar-light bg-light"
      }`}
    >
      {/* LOGO */}
      <a className="navbar-brand" href="#">
        <img src={logo} alt="logo" height="40" />
      </a>

      {/* TOGGLER */}
      <button className="navbar-toggler" onClick={() => setOpen(!open)}>
        <span className="navbar-toggler-icon"></span>
      </button>

      {/* COLLAPSE */}
      <div
        className={`collapse navbar-collapse ${
          theme === "dark" ? "bg-dark" : "bg-light"
        } ${open ? "show" : ""}`}
      >
        {/* MENU */}
        <ul className="navbar-nav mx-auto nav-menu">
          <li className="nav-item">
            <button className="nav-link btn fw-bold" onClick={goProducts}>
              Home
            </button>
          </li>

          <li className="nav-item">
            <button className="nav-link btn fw-bold" onClick={goProducts}>
              Products
            </button>
          </li>

          <li className="nav-item">
            <button className="nav-link btn fw-bold" onClick={goServices}>
              Services
            </button>
          </li>

          <li className="nav-item">
            <button className="nav-link btn fw-bold" onClick={goAbout}>
              About
            </button>
          </li>

          <li className="nav-item">
            <button className="nav-link btn fw-bold" onClick={goContact}>
              Contact
            </button>
          </li>
        </ul>

        {/* RIGHT */}
        <div className="d-flex align-items-center gap-2 position-relative">
          {/* THEME BUTTON */}
          {window.location.pathname === "/" && (
            <button
              onClick={toggleTheme}
              className={`btn ${
                theme === "dark" ? "btn-outline-light" : "btn-outline-dark"
              }`}
            >
              {theme === "dark" ? "☀️" : "🌙"}
            </button>
          )}

          {/* PROFILE / LOGIN */}
          {user ? (
            <div className="position-relative">
              {/* PROFILE BUTTON */}
              <div
                onClick={() => setProfileOpen(!profileOpen)}
                className="d-flex align-items-center justify-content-center btn rounded-circle text-white btn-secondary"
                style={{ width: "40px", height: "40px", cursor: "pointer" }}
              >
                <span className="fw-bold">
                  {user.name?.charAt(0).toUpperCase()}
                </span>
              </div>

              {/* 🔥 POPUP */}
              {profileOpen && (
                <div
                  className={`position-absolute end-0 mt-2 p-3 rounded shadow ${
                    theme === "dark" ? "bg-dark text-light" : "bg-white text-dark"
                  }`}
                  style={{ width: "220px", zIndex: 1000 }}
                >
                  <p className="mb-1 fw-bold">{user.name}</p>
                  <p className="mb-1 small">{user.email}</p>
                  <p className="mb-2 small">{user.phone}</p>

                  <hr />

                  <button
                    onClick={handleLogout}
                    className="btn btn-danger w-100"
                  >
                    Logout
                  </button>
                </div>
              )}
            </div>
          ) : (
            <Link
              to="/login"
              className={`btn ${
                theme === "dark" ? "btn-outline-light" : "btn-outline-dark"
              }`}
            >
              Login
            </Link>
          )}

          {/* CART */}
          <button className="btn btn-secondary text-light">
            Cart 🛒
          </button>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;