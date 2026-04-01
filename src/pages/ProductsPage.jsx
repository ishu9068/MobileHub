import React, { useState, useEffect } from "react";
import Navbar from "../components/Navbar";
import Sidebar from "../components/SidebarBS";
import ProductsContainer from "../components/ProductsContainer";
import api from "../api/axios";

const ProductsPage = ({ theme, setTheme, user }) => {
  const [selectedCategory, setSelectedCategory] = useState("");
  const [cartItems, setCartItems] = useState([]);

  const isDark = theme === "dark";

  // ✅ FETCH CART (FIXED 🔥)
  const fetchCart = async () => {
    try {
      const { data } = await api.get("/cart");

      // 🔥 IMPORTANT FIX (array ensure)
      setCartItems(data.cart || data || []);
    } catch (err) {
      console.log(err);
      setCartItems([]);
    }
  };

  useEffect(() => {
    fetchCart();
  }, []);

  // ✅ UPDATE QTY (FIXED 🔥 productId → cartId mapping)
  const updateQuantity = async (productId, qty) => {
    if (qty < 1) return;

    try {
      const item = cartItems.find(
        (i) => i?.productId?._id === productId
      );

      if (!item) return;

      await api.put(`/cart/${item._id}`, { quantity: qty });

      fetchCart();
    } catch (err) {
      console.log(err);
    }
  };

  // ✅ ADD TO CART
  const addToCart = async (product) => {
    try {
      await api.post("/cart", { productId: product._id });
      fetchCart();
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div
      style={{
        backgroundColor: isDark ? "#121212" : "#f5f5f5",
        height: "100vh",
        color: isDark ? "#f5f5f5" : "#121212",
        overflow: "hidden",
      }}
    >
      {/* NAVBAR */}
      <div style={{ position: "fixed", top: 0, width: "100%", zIndex: 1000 }}>
        <Navbar theme={theme} setTheme={setTheme} user={user} />
      </div>

      <div
        className="container-fluid"
        style={{
          marginTop: "70px",
          height: "calc(100vh - 70px)",
        }}
      >
        <div className="row h-100">

          {/* SIDEBAR */}
          <div
            className="col-md-3 col-lg-2"
            style={{
              position: "fixed",
              top: "70px",
              left: 0,
              height: "calc(100vh - 70px)",
              overflowY: "auto",
              background: isDark ? "#1e1e1e" : "#fff",
            }}
          >
            <Sidebar setSelectedCategory={setSelectedCategory} />
          </div>

          {/* PRODUCTS */}
          <div
            className="col-md-9 col-lg-10"
            style={{
              marginLeft: "16.66%",
              height: "100%",
              overflowY: "auto",
              padding: "20px",
            }}
          >
            <ProductsContainer
              selectedCategory={selectedCategory}
              cartItems={cartItems}
              addToCart={addToCart}
              updateQuantity={updateQuantity}
            />
          </div>

        </div>
      </div>
    </div>
  );
};

export default ProductsPage;