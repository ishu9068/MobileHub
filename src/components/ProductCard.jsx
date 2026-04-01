import React from "react";

const ProductCard = ({ item, qty, addToCart, updateQuantity }) => {
  if (!item) return null;

  return (
    <div className="card product-card h-100 shadow-sm">

      {/* IMAGE */}
      <div className="text-center p-2">
        <img
          src={item?.image || "https://via.placeholder.com/150"}
          alt={item?.name}
          className="img-fluid"
          style={{ height: "150px", objectFit: "contain" }}
        />
      </div>

      {/* BODY */}
      <div className="card-body d-flex flex-column">

        <h6>{item?.name}</h6>

        <p className="fw-bold text-primary">
          ₹{item?.price}
        </p>

        {/* 🔥 CART */}
        {qty === 0 ? (
          <button
            className="btn btn-primary mt-auto"
            onClick={() => addToCart(item)}
          >
            Add to Cart
          </button>
        ) : (
          <div className="d-flex justify-content-between align-items-center mt-auto">
            <button
              className="btn btn-danger btn-sm"
              onClick={() => updateQuantity(item._id, qty - 1)}
            >
              -
            </button>

            <span className="fw-bold">{qty}</span>

            <button
              className="btn btn-success btn-sm"
              onClick={() => updateQuantity(item._id, qty + 1)}
            >
              +
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default ProductCard;