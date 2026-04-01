import React from "react";

const Footer = ({ theme }) => {
  return (
    <footer
      className={`pt-5 pb-3 ${
        theme === "dark" ? "bg-dark text-light" : "bg-light text-dark"
      }`}
    >
      <div className="container">
        <div className="row">

          {/* Brand */}
          <div className="col-md-3 mb-4">
            <h5 className="fw-bold">MobileHub</h5>
            <p className="text-secondary">
              Your one-stop shop for mobiles & accessories.
            </p>
          </div>

          {/* Shop */}
          <div className="col-md-3 mb-4">
            <h6 className="fw-bold">Shop</h6>
            <ul className="list-unstyled">
              <li>Mobile Phones</li>
              <li>Earbuds</li>
              <li>Power Banks</li>
              <li>Chargers</li>
            </ul>
          </div>

          {/* Support */}
          <div className="col-md-3 mb-4">
            <h6 className="fw-bold">Support</h6>
            <ul className="list-unstyled">
              <li>Help Center</li>
              <li>Contact Us</li>
              <li>Returns</li>
              <li>Warranty</li>
            </ul>
          </div>

          {/* Contact */}
          <div className="col-md-3 mb-4">
            <h6 className="fw-bold">Contact</h6>
            <p className="text-secondary">📧 support@mobilehub.com</p>
            <p className="text-secondary">📞 +91 9876543210</p>

            {/* Social */}
            <div>
              <span className="me-2">🌐</span>
              <span className="me-2">📘</span>
              <span className="me-2">📸</span>
              <span>🐦</span>
            </div>
          </div>

        </div>

        {/* Bottom */}
        <hr />

        <div className="text-center">
          <p className="mb-0">
            © 2026 MobileHub | All Rights Reserved
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;