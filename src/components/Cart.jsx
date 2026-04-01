import React from "react";
import "bootstrap/dist/css/bootstrap.min.css";

const Cart = ({ cartItems = [], theme = "light", onRemove, onQuantityChange }) => {
  const isDark = theme === "dark";

  const totalPrice = cartItems.reduce(
    (acc, item) => acc + item.price * item.quantity,
    0
  );

  return (
    <div
      className={`container py-4 ${
        isDark ? "bg-dark text-light" : "bg-light text-dark"
      }`}
      style={{ minHeight: "100vh" }}
    >
      <h2 className="mb-4">🛒 Your Cart</h2>

      {cartItems.length === 0 ? (
        <div className="text-center py-5">
          <h4>Your cart is empty 😢</h4>
        </div>
      ) : (
        <div className="row">
          {/* LEFT - ITEMS */}
          <div className="col-lg-8">
            {cartItems.map((item) => (
              <div
                key={item._id}
                className={`card mb-3 shadow-sm ${
                  isDark ? "bg-secondary text-light" : ""
                }`}
              >
                <div className="row g-0 align-items-center">
                  <div className="col-md-3">
                    <img
                      src={item.image}
                      className="img-fluid rounded-start"
                      alt={item.name}
                    />
                  </div>

                  <div className="col-md-9">
                    <div className="card-body d-flex justify-content-between align-items-center">
                      <div>
                        <h5 className="card-title">{item.name}</h5>
                        <p className="card-text mb-1">₹{item.price}</p>

                        {/* Quantity */}
                        <div className="d-flex align-items-center gap-2">
                          <button
                            className="btn btn-outline-danger btn-sm"
                            onClick={() =>
                              onQuantityChange(item._id, item.quantity - 1)
                            }
                          >
                            -
                          </button>

                          <span>{item.quantity}</span>

                          <button
                            className="btn btn-outline-success btn-sm"
                            onClick={() =>
                              onQuantityChange(item._id, item.quantity + 1)
                            }
                          >
                            +
                          </button>
                        </div>
                      </div>

                      {/* Right side */}
                      <div className="text-end">
                        <h6>₹{item.price * item.quantity}</h6>

                        <button
                          className="btn btn-sm btn-danger mt-2"
                          onClick={() => onRemove(item._id)}
                        >
                          Remove
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* RIGHT - SUMMARY */}
          <div className="col-lg-4">
            <div
              className={`card shadow p-3 ${
                isDark ? "bg-secondary text-light" : ""
              }`}
            >
              <h4>Order Summary</h4>
              <hr />

              <div className="d-flex justify-content-between">
                <span>Total Items:</span>
                <span>{cartItems.length}</span>
              </div>

              <div className="d-flex justify-content-between">
                <span>Total Price:</span>
                <strong>₹{totalPrice}</strong>
              </div>

              <button className="btn btn-primary w-100 mt-3">
                Proceed to Checkout
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Cart;


// ================= USAGE EXAMPLE =================
// import Cart from "./Cart";
//
// const [cartItems, setCartItems] = useState([]);
// const [theme, setTheme] = useState("light");
//
// const handleRemove = (id) => {
//   setCartItems(cartItems.filter((item) => item._id !== id));
// };
//
// const handleQuantityChange = (id, qty) => {
//   if (qty < 1) return;
//   setCartItems(
//     cartItems.map((item) =>
//       item._id === id ? { ...item, quantity: qty } : item
//     )
//   );
// };
//
// <Cart
//   cartItems={cartItems}
//   theme={theme}
//   onRemove={handleRemove}
//   onQuantityChange={handleQuantityChange}
// />;
