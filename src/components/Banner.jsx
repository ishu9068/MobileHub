import React from "react";
import { Link } from "react-router-dom";

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
       <Link to="/product" className="btn btn-primary">
          Explore Now
        </Link>
      </div>
    </div>
  );
};

export default Banner;