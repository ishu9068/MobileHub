import React, { useState } from "react";
import "./App.css";
import Home from "./pages/Home";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle.min.js";
import { BrowserRouter, Routes, Route } from "react-router-dom";

import ProtectedRoute from "./utils/ProtectedRoute";
import RoleBasedRoute from "./utils/RoleBasedRoute";
import ProductsPage from "./pages/ProductsPage";
import Login from "./auth/Login";
import Register from "./auth/Register";
import Error from "./error/Error";
import Cart from "./components/Cart";
import ProductDetails from "./components/ProductDetails";

import { ThemeProvider } from "./context/ThemeContext";
import { getUser } from "./utils/auth";

function App() {

  // 🔥 GLOBAL CART STATE
  const [cartItems, setCartItems] = useState([]);

  const user = getUser();

  // ✅ ADD TO CART
  const addToCart = (product) => {
    const exist = cartItems.find((item) => item._id === product._id);

    if (exist) {
      setCartItems(
        cartItems.map((item) =>
          item._id === product._id
            ? { ...item, quantity: item.quantity + 1 }
            : item,
        ),
      );
    } else {
      setCartItems([...cartItems, { ...product, quantity: 1 }]);
    }
  };

  // ✅ REMOVE
  const removeFromCart = (id) => {
    setCartItems(cartItems.filter((item) => item._id !== id));
  };

  // ✅ UPDATE QTY
  const updateQuantity = (id, qty) => {
    if (qty < 1) return;

    setCartItems(
      cartItems.map((item) =>
        item._id === id ? { ...item, quantity: qty } : item,
      ),
    );
  };

  return (
    <ThemeProvider>
      <BrowserRouter>
        <Routes>
          {/* PUBLIC */}
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />

          {/* CUSTOMER */}
          <Route
            path="/product"
            element={
              <ProtectedRoute>
                <RoleBasedRoute allowedRoles={["customer"]}>
                  <ProductsPage
                    cartItems={cartItems}
                    addToCart={addToCart}
                    updateQuantity={updateQuantity}
                    user={user}
                  />
                </RoleBasedRoute>
              </ProtectedRoute>
            }
          />

          <Route
           path="/product/:id"
           element={
              <ProtectedRoute>
                <RoleBasedRoute allowedRoles={["customer"]}>
                  <ProductDetails
                    cartItems={cartItems}
                    addToCart={addToCart}
                    updateQuantity={updateQuantity}
                    user={user}
                  />
                </RoleBasedRoute>
              </ProtectedRoute>
            } />
          
          {/* CART */}
          <Route
            path="/cart"
            element={
              <ProtectedRoute>
                <Cart
                  cartItems={cartItems}
                  onRemove={removeFromCart}
                  onQuantityChange={updateQuantity}
                />
              </ProtectedRoute>
            }
          />

          {/* ERROR */}
          <Route path="*" element={<Error />} />
        </Routes>
      </BrowserRouter>
    </ThemeProvider>
  );
}

export default App;
