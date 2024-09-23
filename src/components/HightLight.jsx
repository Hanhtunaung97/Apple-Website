import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import React from "react";
import { rightImg, watchImg } from "../utils";
import VideoCarousel from "./VideoCarousel";



const HightLight = () => {
  useGSAP(() => {
    gsap.to("#heading", { opacity: 1, y: 0 });
    gsap.to(".link", { opacity: 1, y: 0, duration: 1, stagger: 0.5 });
  }, []);
  return (
    <section className=" w-screen h-full bg-zinc overflow-hidden common-padding">
      <div className=" screen-max-width ">
        <div className="mb-12 w-full justify-between items-end md:flex">
          <h1 id="heading" className="section-heading font-heading">
            Get The HightLights
          </h1>
          <div className="flex items-end gap-x-5">
            <p className="link">
              Watch the film
              <img src={watchImg} alt="watch" className="ml-2" />
            </p>
            <p className="link">
              Watch the event
              <img src={rightImg} alt="right" className="ml-2" />
            </p>
          </div>
        </div>
       <VideoCarousel/>
      </div>
    </section>
  );
};

export default HightLight;
