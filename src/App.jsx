import React from "react";
import { Features, Footer, Hero, HightLight, HowItWorks, Model, Navbar } from "./components";
import * as Sentry from "@sentry/react";
const App = () => {
  return (
    <main className=" bg-black">
      <Navbar />
      <Hero />
      <HightLight />
      <Model />
      <Features/>
      <HowItWorks/>
      <Footer />
    </main>
  );
};

export default Sentry.withProfiler(App);
