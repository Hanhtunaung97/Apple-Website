import { Html } from "@react-three/drei";
import React from "react";
import { quantum } from "ldrs";
quantum.register();
const Loader = () => {
  return (
    <Html>
      <div className="absolute top-0 left-0 w-full h-full flex justify-center items-center">
        <div className=" w-[10vw] h-[10vw] rounded-full">
          <l-quantum size="50" speed="1.75" color="white"></l-quantum>
        </div>
      </div>
    </Html>
  );
};

export default Loader;
