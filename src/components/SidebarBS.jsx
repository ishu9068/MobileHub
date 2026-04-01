import React from "react";

const categories = [
  "Mobile Phones",
  "Earbuds",
  "Power Banks",
  "Bluetooth Speakers",
  "Chargers",
  "Mobile Covers",
  "Screen Protectors",
  "Charging Cables",
];

const Sidebar = ({ setSelectedCategory }) => {
  return (
    <div className="bg-dark text-light p-3 h-100">
      <h5 className="mb-3">Categories</h5>

      <ul className="list-unstyled">
        <li
          className="mb-2 sidebar-item"
          onClick={() => setSelectedCategory("")}
        >
          All Products
        </li>

        {categories.map((cat, index) => (
          <li
            key={index}
            className="mb-2 sidebar-item"
            onClick={() => setSelectedCategory(cat.toLowerCase())}
          >
            {cat}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Sidebar;