import React, { useState, useRef, useEffect } from "react";
import logo from "../assets/logo.png";
import { Link, useNavigate, useLocation } from "react-router-dom";

const Navbar = ({ theme, setTheme }) => {
  const [open, setOpen] = useState(false);
  const [profileOpen, setProfileOpen] = useState(false);

  const navigate = useNavigate();
  const location = useLocation();
  const profileRef = useRef();

  const toggleTheme = () => {
    setTheme(theme === "dark" ? "light" : "dark");
  };

  const user = JSON.parse(localStorage.getItem("user"));

  // 🔥 NAVIGATION FUNCTION (SPA SCROLL)
  const handleNav = (section) => {
    navigate("/", { state: { scrollTo: section } });
    setOpen(false);
  };

  // 🔥 OUTSIDE CLICK CLOSE PROFILE
  useEffect(() => {
    const handleClickOutside = (e) => {
      if (profileRef.current && !profileRef.current.contains(e.target)) {
        setProfileOpen(false);
      }
    };

    if (profileOpen) {
      document.addEventListener("mousedown", handleClickOutside);
    }

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [profileOpen]);

  // 🔥 LOGOUT
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
      <div className="navbar-brand" style={{ cursor: "pointer" }}>
        <img
          src={logo}
          alt="logo"
          height="40"
          onClick={() => {
            navigate("/");
            setOpen(false);
          }}
        />
      </div>

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

          {/* HOME */}
          <li className="nav-item">
            <button
              className="nav-link btn fw-bold"
              onClick={() => {
                navigate("/");
                setOpen(false);
              }}
            >
              Home
            </button>
          </li>

          {/* PRODUCTS */}
          <li className="nav-item">
            <button
              className="nav-link btn fw-bold"
              onClick={() => {
                navigate("/products");
                setOpen(false);
              }}
            >
              Products
            </button>
          </li>

          {/* SERVICES */}
          <li className="nav-item">
            <button
              className="nav-link btn fw-bold"
              onClick={() => handleNav("services")}
            >
              Services
            </button>
          </li>

          {/* ABOUT */}
          <li className="nav-item">
            <button
              className="nav-link btn fw-bold"
              onClick={() => handleNav("about")}
            >
              About
            </button>
          </li>

          {/* CONTACT */}
          <li className="nav-item">
            <button
              className="nav-link btn fw-bold"
              onClick={() => handleNav("contact")}
            >
              Contact
            </button>
          </li>
        </ul>

        {/* RIGHT */}
        <div className="d-flex align-items-center gap-2 position-relative">

          {/* THEME BUTTON */}
          {location.pathname === "/" && (
            <button
              onClick={toggleTheme}
              className={`btn ${
                theme === "dark" ? "btn-outline-light" : "btn-outline-dark"
              }`}
            >
              {theme === "dark" ? "☀️" : "🌙"}
            </button>
          )}

          {/* PROFILE */}
          {user ? (
            <div className="position-relative" ref={profileRef}>

              {/* BUTTON */}
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
                  className={`position-absolute mt-2 p-3 rounded shadow ${
                    theme === "dark"
                      ? "bg-dark text-light"
                      : "bg-white text-dark"
                  }`}
                  style={{
                    width: "220px",
                    zIndex: 1000,

                    left: window.innerWidth >= 768 ? "-180px" : "auto",

                  }}
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
          {user && (
            <button className="btn btn-secondary text-light">
              Cart 🛒
            </button>
          )}

        </div>
      </div>
    </nav>
  );
};

export default Navbar;