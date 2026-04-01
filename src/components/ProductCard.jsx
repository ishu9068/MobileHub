import React from "react";
import { useNavigate } from "react-router-dom";

const ProductCard = ({
  item,
  qty = 0,
  addToCart,
  updateQuantity,
  showCart = true,    
  clickable = true,    
}) => {
  const navigate = useNavigate();

  if (!item) return null;

  const handleCardClick = () => {
    if (clickable) {
      navigate(`/product/${item._id}`);
    }
  };

  return (
    <div
      className="card product-card h-100 shadow-sm"
      style={{ cursor: clickable ? "pointer" : "default" }}
      onClick={handleCardClick}
    >
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

        {/* 🔥 CART (OPTIONAL) */}
        {showCart && (
          qty === 0 ? (
            <button
              className="btn btn-primary mt-auto"
              onClick={(e) => {
                e.stopPropagation(); // 🔥 prevent navigation
                addToCart(item);
              }}
            >
              Add to Cart
            </button>
          ) : (
            <div
              className="d-flex justify-content-between align-items-center mt-auto"
              onClick={(e) => e.stopPropagation()} // 🔥 prevent navigation
            >
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
          )
        )}

      </div>
    </div>
  );
};

export default ProductCard;