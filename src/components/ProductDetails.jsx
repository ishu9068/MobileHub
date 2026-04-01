import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import Navbar from "../components/Navbar";
import ProductCard from "../components/ProductCard";
import api from "../api/axios";
import Footer from "./Footer";

const ProductDetails = ({ theme, setTheme }) => {
  const { id } = useParams();

  const [product, setProduct] = useState(null);
  const [related, setRelated] = useState([]);

  const isDark = theme === "dark";

  useEffect(() => {
    const fetchData = async () => {
      try {
        // ✅ SINGLE PRODUCT
        const res1 = await api.get(`/product/${id}`);

        // 🔥 HANDLE BOTH CASES (important)
        const productData = res1.data?.product || res1.data;
        setProduct(productData);

        // ✅ ALL PRODUCTS
        const res2 = await api.get("/product");

        const allProducts = res2.data?.products || res2.data || [];

        // 🔥 FILTER RELATED (same category if exists)
        const filtered = allProducts.filter(
          (item) =>
            item._id !== id &&
            (productData?.category
              ? item.category === productData.category
              : true)
        );

        setRelated(filtered.slice(0, 8));
      } catch (err) {
        console.log("Error:", err);
      }
    };

    fetchData();
    window.scrollTo(0, 0);
  }, [id]);

  if (!product) {
    return <h4 className="text-center mt-5">Loading...</h4>;
  }

  return (
    <div
      style={{
        background: isDark ? "#121212" : "#f5f5f5",
        minHeight: "100vh",
        color: isDark ? "#fff" : "#000",
      }}
    >
      <Navbar theme={theme} setTheme={setTheme} />

      <div className="container mt-5 pt-5">

        {/* 🔥 MAIN PRODUCT */}
        <div className="row">

          {/* LEFT IMAGE */}
          <div className="col-md-6 text-center mb-3">
            <img
              src={product?.image || "https://via.placeholder.com/300"}
              alt={product?.name}
              className="img-fluid"
              style={{ maxHeight: "350px", objectFit: "contain" }}
            />
          </div>

          {/* RIGHT DETAILS */}
          <div className="col-md-6">
            <h3>{product?.name}</h3>
            <h4 className="text-success">₹{product?.price}</h4>

            <p>{product?.description}</p>

            <button className="btn btn-primary me-2">
              Add to Cart
            </button>

            <button className="btn btn-warning">
              Buy Now
            </button>
          </div>

        </div>

        {/* 🔥 RELATED PRODUCTS */}
        <div className="mt-5">
          <h4>Related Products</h4>

          <div className="row">
            {related.length > 0 ? (
              related.map((item) => (
                <div key={item._id} className="col-6 col-md-3 mb-3">
                  <ProductCard item={item} showCart={false} />
                </div>
              ))
            ) : (
              <p>No related products found</p>
            )}
          </div>
        </div>
      </div>
       <Footer />
    </div>
  );
};

export default ProductDetails;