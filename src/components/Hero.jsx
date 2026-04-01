import React from "react";

const Hero = ({ theme }) => {
  return (
    <div
      className="d-flex align-items-center justify-content-center text-center"
      style={{
        height: "100vh",
        backgroundImage: "url('../../src/assets/home.jpg')", // yaha apna banner laga
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

        <button className={`btn me-2 ${
          theme === "dark" ? "btn-light" : "btn-dark"
        }`}>
          Shop Now
        </button>

        <button className={`btn ${
          theme === "dark" ? "btn-outline-light" : "btn-outline-dark"
        }`}>
          Explore
        </button>
      </div>
    </div>
  );
};

export default Hero;