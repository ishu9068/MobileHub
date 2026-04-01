import React, { useEffect, useState } from "react";
import ProductCard from "./ProductCard";
import api from "../api/axios";

const ProductsContainer = ({
  selectedCategory,
  cartItems = [],
  addToCart,
  updateQuantity,
}) => {
  const [products, setProducts] = useState([]);
  const [search, setSearch] = useState("");
  const [loading, setLoading] = useState(true);

  // ✅ FETCH PRODUCTS
  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const res = await api.get("/product");
        setProducts(res.data.products || []);
      } catch (err) {
        console.log(err);
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, []);

  // ✅ SAFE QTY (CRASH FIX 🔥)
  const getQty = (id) => {
    if (!Array.isArray(cartItems)) return 0;

    const item = cartItems.find(
      (i) => i?.productId?._id === id
    );

    return item ? item.quantity : 0;
  };

  // FILTER
  const filtered = products.filter((item) => {
    const matchCategory = selectedCategory
      ? item.category?.toLowerCase() === selectedCategory
      : true;

    const matchSearch = item.name
      ?.toLowerCase()
      .includes(search.toLowerCase());

    return matchCategory && matchSearch;
  });

  return (
    <div>
      {/* TOP */}
      <div className="d-flex justify-content-between align-items-center mb-3 flex-wrap gap-2">
        <h4 className="fw-bold">
          {selectedCategory || "All Products"}
        </h4>

        <input
          type="text"
          className="form-control"
          style={{ maxWidth: "250px" }}
          placeholder="Search..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
      </div>

      {loading ? (
        <div className="text-center py-5">
          <h5>Loading...</h5>
        </div>
      ) : (
        <div className="row">
          {filtered.length === 0 ? (
            <div className="text-center py-5">
              <h5>No products found 😢</h5>
            </div>
          ) : (
            filtered.map((item) => (
              <div
                key={item._id}
                className="col-12 col-sm-6 col-md-4 col-lg-3 mb-4"
              >
                <ProductCard
                  item={item}
                  qty={getQty(item._id)}
                  addToCart={addToCart}
                  updateQuantity={updateQuantity}
                />
              </div>
            ))
          )}
        </div>
      )}
    </div>
  );
};

export default ProductsContainer;