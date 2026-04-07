import React from "react";
import { Link } from "react-router-dom";
 
const Hero = ({ theme }) => {
  const user = JSON.parse(localStorage.getItem("user"));
  return (
    <div
      className="d-flex align-items-center justify-content-center text-center hero-section"
      style={{
        height: "100vh",
        backgroundSize: "cover",
        backgroundPosition: "center",
        position: "relative",
        backgroundColor: theme === "dark" ? "#000000" : "#ffffff",
      }}
    >
      {/* Overlay */}
      <div
        style={{
          position: "absolute",
          top: 0,
          left: 0,
          width: "100%",
          height: "100%",
          backgroundColor:
            theme === "dark"
              ? "rgba(0,0,0,0.6)"
              : "rgba(255,255,255,0.6)",
        }}
      ></div>

      {/* Content */}
      <div style={{ position: "relative", zIndex: 2 }}>
        <h1 className={theme === "dark" ? "text-light" : "text-dark"}>
          Upgrade Your Mobile Experience
        </h1>
        <p className="text-secondary">
          Latest Gadgets at Best Prices
        </p>
      

      <Link
        to={user ? "/product" : "/login"}
        className={`btn ${
          theme === "dark" ? "btn-light" : "btn-dark"
        }`}
      >
        Shop Now
      </Link>
      </div>
    </div>
  );
};

export default Hero;