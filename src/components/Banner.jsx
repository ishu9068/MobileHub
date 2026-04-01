import React from "react";

const Banner = ({ theme }) => {
  return (
    <div className="container my-5">
      <div
        className="p-5 text-center rounded"
        style={{
          background: theme === "dark" ? "#1e1e1e" : "#eaeaea",
        }}
      >
        <h2 className={theme === "dark" ? "text-light" : "text-dark"}>
          Latest Smartphones
        </h2>
        <p className={theme === "dark" ? "text-light" : "text-dark"}>
          Check out new arrivals
        </p>
        <button className="btn btn-primary">Explore Now</button>
      </div>
    </div>
  );
};

export default Banner;