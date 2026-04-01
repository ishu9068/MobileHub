import React from "react";

const Offers = ({ theme }) => {
  return (
    <div className={`py-5 text-center ${
      theme === "dark" ? "bg-secondary text-light" : "bg-light text-dark"
    }`}>
      <h2>🔥 Mega Sale</h2>
      <p>Up to 50% OFF on Accessories</p>
      <button className="btn btn-danger">Shop Deals</button>
    </div>
  );
};

export default Offers;