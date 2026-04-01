import React from "react";

const products = [
  { name: "iPhone 17", price: "₹70,000", img: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRCiYidzt1ZgT0jLpCmQzeiNLxhhWeuyK0Amg&s" },
  { name: "Earbuds pro", price: "₹2,000", img: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSXTyn7l4ON49Kj8b5xWRZe9frhXoq2Fzzd0w&s" },
  { name: "Power Bank", price: "₹1,200", img: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSsoL0HNjkgkZO-DLwMptuB2BNNioS8VgD2gA&s" },
  { name: "Speaker", price: "₹3,000", img: "https://blaupunktaudio.in/cdn/shop/files/bt03-rgb-wireless-bluetooth-speaker-blaupunkt-india-1-removebg-preview_360x.png?v=1772264725" },
];

const Products = ({ theme }) => {
  return (
    <div className="container my-5">
      <h3 className={theme === "dark" ? "text-light" : "text-dark"}>
        Featured Products
      </h3>

      <div className="row">
        {products.map((p, i) => (
          <div className="col-md-3" key={i}>
            <div className={`card mb-4 ${
              theme === "dark"
                ? "bg-dark text-light border-secondary"
                : "bg-light text-dark"
            }`}>
              <img src={p.img} className="card-img-top card-img " alt="" />

              <div className="card-body text-center">
                <h6>{p.name}</h6>
                <p className="text-secondary">{p.price}</p>

                <button className={`btn btn-sm ${
                  theme === "dark" ? "btn-light" : "btn-dark"
                }`}>
                  Add to Cart
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Products;