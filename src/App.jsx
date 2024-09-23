import React from "react";
import { Footer, Hero, HightLight, Model, Navbar } from "./components";
const App = () => {
  return (
    <main className=" bg-black">
      <Navbar />
      <Hero />
      <HightLight />
      <Model />
      <Footer />
    </main>
  );
};

export default App;
