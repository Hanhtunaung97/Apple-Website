import React from "react";
import Navbar from "./components/Navbar";
import Hero from "./components/Hero";
import HightLight from "./components/HightLight";
import Footer from "./components/Footer";
const App = () => {
  return (
    <main className=" bg-black">
      <Navbar />
      <Hero />
      <HightLight />
      <Footer />
    </main>
  );
};

export default App;
