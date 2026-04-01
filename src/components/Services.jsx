import React from "react";

const Services = ({ theme }) => {
  return (
    <section
      style={{
        padding: "60px 20px",
        background: theme === "dark" ? "#121212" : "#f9f9f9",
        color: theme === "dark" ? "#fff" : "#000",
      }}
    >
      <div className="container text-center">
        <h2 className="mb-4">Our Services</h2>

        <div className="row">
          <div className="col-md-3 col-6 mb-4">
            <h5>🛍️ Easy Shopping</h5>
            <p>Simple and user-friendly experience.</p>
          </div>

          <div className="col-md-3 col-6 mb-4">
            <h5>💳 Secure Payment</h5>
            <p>Safe and trusted payment methods.</p>
          </div>

          <div className="col-md-3 col-6 mb-4">
            <h5>🔄 Easy Returns</h5>
            <p>Hassle-free return policy.</p>
          </div>

          <div className="col-md-3 col-6 mb-4">
            <h5>📞 24/7 Support</h5>
            <p>We are always here to help you.</p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Services;