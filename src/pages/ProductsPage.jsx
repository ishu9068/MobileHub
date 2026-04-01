import React, { useState, useEffect, useRef } from "react";
import Navbar from "../components/Navbar";
import Sidebar from "../components/SidebarBS";
import ProductsContainer from "../components/ProductsContainer";
import api from "../api/axios";
import Footer from "../components/Footer";

const ProductsPage = ({ theme, setTheme, user }) => {
  const [selectedCategory, setSelectedCategory] = useState("");
  const [cartItems, setCartItems] = useState([]);
  const [showSidebar, setShowSidebar] = useState(false);

  const sidebarRef = useRef();

  const isDark = theme === "dark";

  // ✅ FETCH CART
  const fetchCart = async () => {
    try {
      const { data } = await api.get("/cart");
      setCartItems(data.cart || data || []);
    } catch (err) {
      console.log(err);
      setCartItems([]);
    }
  };

  useEffect(() => {
    const loadCart = async () => {
      try {
        const { data } = await api.get("/cart");
        setCartItems(data.cart || data || []);
      } catch (err) {
        console.log(err);
        setCartItems([]);
      }
    };

    loadCart();
  }, []);

  // ✅ OUTSIDE CLICK CLOSE SIDEBAR
  useEffect(() => {
    const handleClickOutside = (e) => {
      if (
        sidebarRef.current &&
        !sidebarRef.current.contains(e.target)
      ) {
        setShowSidebar(false);
      }
    };

    if (showSidebar) {
      document.addEventListener("mousedown", handleClickOutside);
    }

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [showSidebar]);

  // ✅ UPDATE QTY
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
        minHeight: "100vh",
        color: isDark ? "#f5f5f5" : "#121212",
      }}
    >
      {/* NAVBAR */}
      <div style={{ position: "fixed", top: 0, width: "100%", zIndex: 1000 }}>
        <Navbar theme={theme} setTheme={setTheme} user={user} />
      </div>

      {/* MOBILE CATEGORY BUTTON */}
      <div className="d-md-none p-2" style={{ marginTop: "70px" }}>
        <button
          className="btn btn-primary w-100"
          onClick={() => setShowSidebar(true)}
        >
          ☰ Categories
        </button>
      </div>

      <div className="container-fluid">
        <div className="row">

          {/* 🔥 SIDEBAR */}
          <div
            ref={sidebarRef}
            className={`${
              showSidebar ? "d-block" : "d-none"
            } d-md-block col-md-3 col-lg-2`}
            style={{
              position: "fixed",
              top: "70px",
              left: 0,
              height: "calc(100vh - 70px)",
              width: "250px",
              overflowY: "auto",
              background: isDark ? "#1e1e1e" : "#fff",
              zIndex: 999,
            }}
          >
            <Sidebar
              setSelectedCategory={(cat) => {
                setSelectedCategory(cat);
                setShowSidebar(false); // ✅ close on click
              }}
              closeSidebar={() => setShowSidebar(false)}
            />
          </div>

          {/* 🔥 OVERLAY */}
          {showSidebar && (
            <div
              className="d-md-none"
              onClick={() => setShowSidebar(false)}
              style={{
                position: "fixed",
                top: 0,
                left: 0,
                width: "100%",
                height: "100%",
                background: "rgba(0,0,0,0.5)",
                zIndex: 998,
              }}
            />
          )}

          {/* 🔥 PRODUCTS */}
          <div
            className="col-12 col-md-9 col-lg-10"
            style={{
              marginTop: "70px",
              marginLeft: window.innerWidth >= 768 ? "250px" : "0",
              padding: "15px",
            }}
          >
            <ProductsContainer
              selectedCategory={selectedCategory}
              cartItems={cartItems}
              addToCart={addToCart}
              updateQuantity={updateQuantity}
            />
            <Footer />
          </div>
          
        </div>
      </div>
     
    </div>
  );
};

export default ProductsPage;