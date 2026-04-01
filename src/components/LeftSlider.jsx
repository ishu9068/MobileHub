import { useEffect, useState } from "react";

const sliderData = [
  {
    title: "🔥 50% OFF",
    desc: "Electronics Mega Sale",
  },
  {
    title: "🛒 New Arrivals",
    desc: "Latest Fashion Deals",
  },
  {
    title: "⚡ Limited Offer",
    desc: "Mobiles under ₹9999",
  },
];

const LeftSlider = () => {
  const [index, setIndex] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setIndex((prev) => (prev + 1) % sliderData.length);
    }, 4000);

    return () => clearInterval(timer);
  }, []);

  return (
    <div
      className="d-none d-md-flex align-items-center justify-content-center text-white"
      style={{
        height: "50vh",
        padding: "20px",
        animation: "slideFade 4s infinite",
      }}
    >
      <div className="text-center">
        <h1 className="fw-bold display-5">
          {sliderData[index].title}
        </h1>
        <p className="lead mt-3">
          {sliderData[index].desc}
        </p>
      </div>

      {/* Animation */}
      <style>
        {`
          @keyframes slideFade {
            0% {
              transform: translateX(-40px);
              opacity: 0;
            }
            30% {
              transform: translateX(0);
              opacity: 1;
            }
            70% {
              transform: translateX(0);
              opacity: 1;
            }
            100% {
              transform: translateX(40px);
              opacity: 0;
            }
          }
        `}
      </style>
    </div>
  );
};

export default LeftSlider;