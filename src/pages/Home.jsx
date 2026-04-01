import React, { useState, useEffect, useRef } from "react";
import Navbar from "../components/Navbar";
import Hero from "../components/Hero";
import Categories from "../components/Categories";
import Products from "../components/Products";
import Footer from "../components/Footer";

import About from "../components/About";
import Services from "../components/Services";
import Contact from "../components/Contact";

import Offers from "../components/Offers";
import WhyUs from "../components/WhyUs";
import Banner from "../components/Banner";
import ProductShowcase from "../components/ProductShowcase";

const Home = () => {
  const [theme, setTheme] = useState(() => {
    const savedTheme = localStorage.getItem("theme");
    return savedTheme || "dark";
  });

  useEffect(() => {
    localStorage.setItem("theme", theme);
  }, [theme]);

  // 🔥 REFS
  const productRef = useRef(null);
  const aboutRef = useRef(null);
  const serviceRef = useRef(null);
  const contactRef = useRef(null);

  // 🔥 SCROLL FUNCTION
  const scrollTo = (ref) => {
    ref.current.scrollIntoView({
      behavior: "smooth",
      block: "start",
    });
  };

  return (
    <div
      style={{
        backgroundColor: theme === "dark" ? "#121212" : "#f5f5f5",
        minHeight: "100vh",
      }}
    >
      <Navbar
        theme={theme}
        setTheme={setTheme}
        goProducts={() => scrollTo(productRef)}
        goAbout={() => scrollTo(aboutRef)}
        goServices={() => scrollTo(serviceRef)}
        goContact={() => scrollTo(contactRef)}
      />
      
      <Hero theme={theme} scrollToProducts={() => scrollTo(productRef)} />
      <ProductShowcase theme={theme} />
      <Categories theme={theme} />

      <Offers theme={theme} />

      <div>
        <Products theme={theme} />
      </div>

      <Banner theme={theme} />
      <WhyUs theme={theme} />

      <div ref={aboutRef}>
        <About theme={theme} />
      </div>

      <div ref={serviceRef}>
        <Services theme={theme} />
      </div>

      <div ref={contactRef}>
        <Contact theme={theme} />
      </div>

      <Footer theme={theme} />
    </div>
  );
};

export default Home;
