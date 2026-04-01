import React, { useState, useEffect, useRef } from "react";
import { useLocation } from "react-router-dom";

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

  const location = useLocation();

  useEffect(() => {
    localStorage.setItem("theme", theme);
  }, [theme]);

  // 🔥 REFS
  const productRef = useRef(null);
  const aboutRef = useRef(null);
  const serviceRef = useRef(null);
  const contactRef = useRef(null);

  // 🔥 NORMAL SCROLL (for same page)
  const scrollTo = (ref) => {
    ref.current?.scrollIntoView({
      behavior: "smooth",
      block: "start",
    });
  };

  // 🔥 SPA ROUTE SCROLL (IMPORTANT)
  useEffect(() => {
    if (location.state?.scrollTo) {
      const section = location.state.scrollTo;

      if (section === "products") {
        productRef.current?.scrollIntoView({ behavior: "smooth" });
      }

      if (section === "services") {
        serviceRef.current?.scrollIntoView({ behavior: "smooth" });
      }

      if (section === "about") {
        aboutRef.current?.scrollIntoView({ behavior: "smooth" });
      }

      if (section === "contact") {
        contactRef.current?.scrollIntoView({ behavior: "smooth" });
      }
    }
  }, [location]);

  return (
    <div
      style={{
        backgroundColor: theme === "dark" ? "#121212" : "#f5f5f5",
        minHeight: "100vh",
      }}
    >
      {/* 🔥 NAVBAR */}
      <Navbar
        theme={theme}
        setTheme={setTheme}
        goProducts={() => scrollTo(productRef)}
        goAbout={() => scrollTo(aboutRef)}
        goServices={() => scrollTo(serviceRef)}
        goContact={() => scrollTo(contactRef)}
      />

      {/* 🔥 HERO */}
      <Hero theme={theme} scrollToProducts={() => scrollTo(productRef)} />

      <ProductShowcase theme={theme} />
      <Categories theme={theme} />
      <Offers theme={theme} />

      {/* 🔥 PRODUCTS SECTION */}
      <div ref={productRef}>
        <Products theme={theme} />
      </div>

      <Banner theme={theme} />
      <WhyUs theme={theme} />

      {/* 🔥 ABOUT */}
      <div ref={aboutRef}>
        <About theme={theme} />
      </div>

      {/* 🔥 SERVICES */}
      <div ref={serviceRef}>
        <Services theme={theme} />
      </div>

      {/* 🔥 CONTACT */}
      <div ref={contactRef}>
        <Contact theme={theme} />
      </div>

      <Footer theme={theme} />
    </div>
  );
};

export default Home;