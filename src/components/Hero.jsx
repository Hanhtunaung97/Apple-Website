import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import React, { useEffect, useState } from "react";
import { heroVideo, smallHeroVideo } from "../utils";

const Hero = () => {
  const [videoSrc, setVideoSrc] = useState(
    window.innerWidth <= 768 ? smallHeroVideo : heroVideo
  );
  const handleSetVideoSrc = () => {
    if (window.innerWidth <= 768) {
      setVideoSrc(smallHeroVideo);
    } else {
      setVideoSrc(heroVideo);
    }
  };
  useEffect(() => {
    window.addEventListener("resize", handleSetVideoSrc);
    return () => window.removeEventListener("resize", handleSetVideoSrc);
  }, []);

  useGSAP(() => {
    gsap.to("#heroText", {
      opacity: 1,
      delay: 2,
    });
    gsap.to("#cta", { opacity: 1, delay: 2, y: -50 });
  }, []);
  return (
    <section className=" w-full nav-height relative">
      <div className=" w-full h-5/6 flex-center flex-col">
        <h1 id="heroText" className=" hero-title font-heading">
          iPhone 15 Pro{" "}
        </h1>
        <div className="md:w-10/12 w-9/12">
          <video
            className=" pointer-events-none"
            muted
            autoPlay
            playsInline={true}
            loop
            key={videoSrc}
          >
            <source src={videoSrc} type="video/mp4" />
          </video>
        </div>
      </div>
      <div className="flex-center flex-col opacity-0 translate-y-20" id="cta">
        <a href="#hightLights" className="btn">
          Buy
        </a>
        <p className=" font-normal text-xl text-gray-100"> From $199/month or $999</p>
      </div>
    </section>
  );
};

export default Hero;
