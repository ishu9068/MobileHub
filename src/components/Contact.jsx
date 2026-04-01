import React from "react";

const Contact = ({ theme }) => {
  return (
    <section
      style={{
        padding: "60px 20px",
        background: theme === "dark" ? "#1a1a1a" : "#ffffff",
        color: theme === "dark" ? "#fff" : "#000",
      }}
    >
      <div className="container text-center">
        <h2 className="mb-4">Contact Us</h2>

        <p>Email: support@mobilehub.com</p>
        <p>Phone: +91 98765 43210</p>

        <div style={{ maxWidth: "500px", margin: "20px auto" }}>
          <input className="form-control mb-2" placeholder="Your Name" />
          <input className="form-control mb-2" placeholder="Your Email" />
          <textarea
            className="form-control mb-2"
            rows="4"
            placeholder="Your Message"
          ></textarea>

          <button className="btn btn-primary w-100">
            Send Message
          </button>
        </div>
      </div>
    </section>
  );
};

export default Contact;