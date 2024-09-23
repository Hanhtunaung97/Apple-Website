import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import React, { useEffect, useRef, useState } from "react";
import ModelView from "./ModelView";
import { yellowImg } from "../utils";
import * as THREE from "three";
import { Canvas } from "@react-three/fiber";
import { View } from "@react-three/drei";
import { models, sizes } from "../constants";
import { animateWithGsapTimeline } from "../utils/animations";
const Model = () => {
  const [size, setSize] = useState("small");
  const [model, setModel] = useState({
    title: "iPhone 15 Pro in Natural Titanium",
    color: ["#8F8A81", "#ffe7b9", "#6f6c64"],
    img: yellowImg,
  });
  //   camera control for model view
  const cameraControlSmall = useRef();
  const cameraControlLarge = useRef();
  //model
  const small = useRef(new THREE.Group());
  const large = useRef(new THREE.Group());
  //   rotation
  const [smallRotation, setSmallRotation] = useState(0);
  const [largeRotation, setLargeRotation] = useState(0);
  const tl = gsap.timeline();
  useEffect(() => {
    if (size === "large") {
      animateWithGsapTimeline(tl, small, smallRotation, "#view1", "#view2", {
        transform: "translateX(-100%)",
        duration: 2,
      });
    }
    if (size === "small") {
      animateWithGsapTimeline(tl, large, largeRotation, "#view2", "#view1", {
        transform: "translateX(0)",
        duration: 2,
      });
    }
  }, [size]);
  useGSAP(() => {
    gsap.to("#heading", { y: 0, opacity: 1 });
  }, []);
  return (
    <section className="common-padding">
      <div className="screen-max-width">
        <h1 className="section-heading font-heading" id="heading">
          Take a closer look.
        </h1>
        <div className="flex flex-col items-center mt-5 ">
          <div className="relative w-full h-[75vh] md:h-[90vh] overflow-hidden ">
            <ModelView
              controlRef={cameraControlSmall}
              item={model}
              size={size}
              setRotationState={setSmallRotation}
              groupRef={small}
              index={1}
              gsapType="view1"
            />
            <ModelView
              controlRef={cameraControlLarge}
              item={model}
              size={size}
              setRotationState={setLargeRotation}
              groupRef={large}
              index={2}
              gsapType="view2"
            />
            <Canvas
              className="w-full h-full "
              style={{
                position: "fixed",
                top: 0,
                left: 0,
                right: 0,
                bottom: 0,
                overflow: "hidden",
              }}
              eventSource={document.getElementById("root")}
            >
              <View.Port />
            </Canvas>
          </div>
          <div className=" w-full mx-auto ">
            <h5 className="font-heading text-sm font-light mb-5 text-center text-gray-50">
              {model.title}
            </h5>
            <div className="flex-center">
              <ul className="color-container">
                {models.map((item, index) => (
                  <li
                    key={index}
                    className=" w-6 h-6 rounded-full cursor-pointer mx-2"
                    style={{ backgroundColor: item.color[0] }}
                    onClick={() => setModel(item)}
                  />
                ))}
              </ul>
              <button className="size-btn-container">
                {sizes.map(({ label, value }) => (
                  <span
                    key={label}
                    className={`size-btn  font-semibold`}
                    style={{
                      backgroundColor: size === value ? "white" : "transparent",
                      color: size === value ? "black" : "white",
                    }}
                    onClick={() => setSize(value)}
                  >
                    {label}
                  </span>
                ))}
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Model;
