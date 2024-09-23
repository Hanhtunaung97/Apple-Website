import React from "react";
import { Footer, Hero, HightLight, Model, Navbar } from "./components";
import * as Sentry from "@sentry/react";
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

export default Sentry.withProfiler(App);
