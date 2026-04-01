import React, { useState, useEffect } from "react";
import axios from "axios";
import { Link } from "react-router-dom";

const categoryList = [
  "Mobile Phones",
  "Earbuds",
  "Power Banks",
  "Bluetooth Speakers",
  "Chargers",
  "Mobile Covers",
  "Screen Protectors",
  "Charging Cables",
];

const Categories = ({ theme }) => {
  const [showAll, setShowAll] = useState(false);
  const [products, setProducts] = useState([]);

  // CATEGORY MODAL
  const [selectedCategory, setSelectedCategory] = useState("");
  const [showModal, setShowModal] = useState(false);

  // PRODUCT MODAL
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [showProductModal, setShowProductModal] = useState(false);

  // API
  useEffect(() => {
    axios
      .get("https://mob-backend.vercel.app/api/product")
      .then((res) => setProducts(res.data.products))
      .catch((err) => console.log(err));
  }, []);

  const visibleCategories = showAll
    ? categoryList
    : categoryList.slice(0, 4);

  // FILTER PRODUCTS
  const modalProducts = products.filter(
    (p) =>
      p.category?.toLowerCase() ===
      selectedCategory.toLowerCase()
  );

  return (
    <div className="container my-5">
      <h3 className={theme === "dark" ? "text-light" : "text-dark"}>
        Categories
      </h3>

      <div className="row">
        {visibleCategories.map((cat, i) => {
          const filteredProducts = products
            .filter(
              (p) =>
                p.category?.toLowerCase() === cat.toLowerCase()
            )
            .slice(0, 4);

          return (
            <div className="col-12 mb-4" key={i}>
              <div
                className={`card p-3 ${
                  theme === "dark"
                    ? "bg-dark text-light border-secondary"
                    : "bg-light text-dark"
                }`}
              >
                {/* HEADER */}
                <div className="d-flex justify-content-between align-items-center mb-2">
                  <h5 className="m-0">{cat}</h5>

                  <button
                    className={`btn btn-sm ${
                      theme === "dark"
                        ? "btn-outline-light"
                        : "btn-outline-dark"
                    }`}
                    onClick={() => {
                      setSelectedCategory(cat);
                      setShowModal(true);
                    }}
                  >
                    View
                  </button>
                </div>

                {/* PREVIEW PRODUCTS */}
                <div className="row">
                  {filteredProducts.length > 0 ? (
                    filteredProducts.map((p) => (
                      <div className="col-md-3 col-6 mb-3" key={p._id}>
                        <div
                          className={`p-2 rounded ${
                            theme === "dark"
                              ? "bg-secondary text-light"
                              : "bg-light border"
                          }`}
                        >
                          <img
                            src={p.image}
                            alt={p.name}
                            style={{
                              width: "100%",
                              height: "150px",
                              objectFit: "cover",
                            }}
                          />
                          <small>{p.name}</small>
                          <p className="m-0 fw-bold">₹{p.price}</p>
                        </div>
                      </div>
                    ))
                  ) : (
                    <p>No products</p>
                  )}
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* VIEW MORE */}
      <div className="text-center mt-3">
        <button
          onClick={() => setShowAll(!showAll)}
          className={`btn ${
            theme === "dark" ? "btn-light" : "btn-dark"
          }`}
        >
          {showAll ? "View Less" : "View More"}
        </button>
      </div>

      {/* 🔥 CATEGORY MODAL */}
      {showModal && (
        <div
          className="modal fade show d-block"
          style={{ background: "rgba(0,0,0,0.7)" }}
        >
          <div className="modal-dialog modal-xl modal-dialog-scrollable">
            <div
              className={`modal-content ${
                theme === "dark"
                  ? "bg-dark text-light"
                  : "bg-light"
              }`}
            >
              {/* HEADER */}
              <div className="modal-header">
                <h5>{selectedCategory}</h5>
                <button
                  className="btn-close"
                  onClick={() => setShowModal(false)}
                ></button>
              </div>

              {/* BODY */}
              <div className="modal-body">
                <div className="row">
                  {modalProducts.map((p) => (
                    <div
                      className="col-md-3 col-sm-6 m-3"
                      key={p._id}
                    >
                      <div
                        className="card h-100 p-2 shadow-sm mb-3"
                        style={{ cursor: "pointer" }}
                        onClick={() => {
                          setSelectedProduct(p);
                          setShowProductModal(true);
                        }}
                      >
                        <img
                          src={p.image}
                          alt={p.name}
                          style={{
                            height: "150px",
                            objectFit: "cover",
                          }}
                        />
                        <div className="mt-2">
                          <small>{p.name}</small>
                          <p className="fw-bold mb-0">
                            ₹{p.price}
                          </p>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* FOOTER */}
              <div className="modal-footer">
                <button
                  className="btn btn-secondary"
                  onClick={() => setShowModal(false)}
                >
                  Close
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/*  PRODUCT DETAILS MODAL */}
      {showProductModal && selectedProduct && (
        <div
          className="modal fade show d-block"
          style={{ background: "rgba(0,0,0,0.85)" }}
        >
          <div className="modal-dialog modal-xl modal-dialog-centered">
            <div
              className={`modal-content ${
                theme === "dark"
                  ? "bg-dark text-light"
                  : "bg-light"
              }`}
            >
              {/* HEADER */}
              <div className="modal-header">
                <h5>{selectedProduct.name}</h5>
                <button
                  className="btn-close"
                  onClick={() => setShowProductModal(false)}
                ></button>
              </div>

              {/* BODY */}
              <div className="modal-body">
                <div className="row">

                  {/* IMAGE */}
                  <div className="col-md-6 text-center">
                    <div className="zoom-container">
                      <img
                        src={selectedProduct.image}
                        alt={selectedProduct.name}
                        className="img-fluid zoom-img"
                      />
                    </div>
                  </div>

                  {/* DETAILS */}
                  <div className="col-md-6">
                    <h4>{selectedProduct.name}</h4>
                    <h5 className="text-primary">
                      ₹{selectedProduct.price}
                    </h5>

                    <p className="mt-3">
                      {selectedProduct.description ||
                        "No description available"}
                    </p>

                    <Link to={`/product/${selectedProduct._id}`} className="btn btn-primary w-100 mb-2">
                      View Details
                    </Link>

                    <Link to={`/product/${selectedProduct._id}`} className="btn btn-success w-100">
                      Buy Now
                    </Link>
                  </div>

                </div>
              </div>

            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Categories;