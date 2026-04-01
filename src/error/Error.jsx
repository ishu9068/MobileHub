import React from "react";
import { useNavigate } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";

const Error = () => {
  const navigate = useNavigate();

  return (
    <div
      className="container d-flex flex-column justify-content-center align-items-center text-center"
      style={{ minHeight: "80vh" }}
    >
      {/* 404 TEXT */}
      <h1
        className="fw-bold text-primary"
        style={{ fontSize: "6rem" }}
      >
        404
      </h1>

      {/* TITLE */}
      <h2 className="fw-bold mb-3">
        Oops! Page Not Found
      </h2>

      {/* BUTTON */}
      <button
        className="btn text-white px-4 py-2"
        style={{
          background: "linear-gradient(135deg, #1976d2, #0d47a1)",
          border: "none",
        }}
        onClick={() => navigate("/")}
      >
        Go to Home
      </button>

      {/* IMAGE */}
      <img
        src="https://cdn-icons-png.flaticon.com/512/564/564619.png"
        alt="Error"
        className="img-fluid mt-4"
        style={{ maxWidth: "300px", opacity: 0.8 }}
      />
    </div>
  );
};

export default Error;