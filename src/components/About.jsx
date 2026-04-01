import React from "react";

const About = ({ theme }) => {
  return (
    <section
      style={{
        padding: "60px 20px",
        background: theme === "dark" ? "#1a1a1a" : "#ffffff",
        color: theme === "dark" ? "#fff" : "#000",
      }}
    >
      <div className="container text-center">
        <h2 className="mb-4">About MobileHub</h2>

        <p style={{ maxWidth: "800px", margin: "0 auto" }}>
          MobileHub is your trusted online store for all mobile products.
          We provide the latest smartphones, chargers, power banks, headphones
          and accessories at the best prices. Our goal is to make your shopping
          experience simple, fast and reliable.
        </p>

        <div className="row mt-5">
          <div className="col-md-4 mb-3">
            <h5>📱 Wide Collection</h5>
            <p>Latest phones & accessories from top brands.</p>
          </div>

          <div className="col-md-4 mb-3">
            <h5>💰 Best Deals</h5>
            <p>Affordable pricing with exciting offers.</p>
          </div>

          <div className="col-md-4 mb-3">
            <h5>🚚 Fast Delivery</h5>
            <p>Quick and safe delivery across India.</p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default About;