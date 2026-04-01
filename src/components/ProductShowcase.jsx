import React, { useState, useEffect } from "react";

const products = [
  {
    name: "vivo X100 Pro",
    desc: "200MP Camera | 120Hz Display | 7000mAh Battery",
    img: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQJgHDMrxSKUrM1XygTGt2LV-0zrkUEtXjM0A&s",
  },
  {
    name: "samsung Galaxy S23",
    desc: "Lightweight | Fast Charging | Premium Design",
    img: "https://images-cdn.ubuy.co.in/68be771f7dd771da1602875a-samsung-galaxy-s23-ultra-5g-s918u-fully.jpg",
  },
  {
    name: "Earbuds Pro",
    desc: "Noise Cancellation | 30hr Battery",
    img: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSXTyn7l4ON49Kj8b5xWRZe9frhXoq2Fzzd0w&s",
  },
];

const ProductShowcase = () => {
  const [index, setIndex] = useState(0);

  // 🔥 Auto Slide
  useEffect(() => {
    const interval = setInterval(() => {
      setIndex((prev) => (prev + 1) % products.length);
    }, 3000);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="showcase-container">

      {/* LEFT TEXT */}
      <div className="showcase-text">
        <h2>{products[index].name}</h2>
        <p>{products[index].desc}</p>

        <button className="btn btn-primary me-2">Buy Now</button>
        <button className="btn btn-outline-light">Learn More</button>
      </div>

      {/* RIGHT IMAGE */}
      <div className="showcase-image">
        <img src={products[index].img} alt="" />
      </div>

    </div>
  );
};

export default ProductShowcase;