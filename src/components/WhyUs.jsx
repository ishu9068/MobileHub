import React from "react";

const WhyUs = () => {
  return (
    <div className="container my-5 text-center">
      <h3 className="mb-4">Why Choose Us</h3>

      <div className="row">
        <div className="col-md-4">
          <div className="card p-4 product-card">
            <h5>🚚 Fast Delivery</h5>
            <p>Quick delivery across India</p>
          </div>
        </div>

        <div className="col-md-4">
          <div className="card p-4 product-card">
            <h5>🔒 Secure Payment</h5>
            <p>100% safe transactions</p>
          </div>
        </div>

        <div className="col-md-4">
          <div className="card p-4 product-card">
            <h5>🔁 Easy Returns</h5>
            <p>Hassle-free returns</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default WhyUs;