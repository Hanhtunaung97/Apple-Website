import { OrbitControls, PerspectiveCamera, View } from "@react-three/drei";
import React, { Suspense } from "react";
import Lights from "./Lights";
import Iphone from "./Iphone";
import * as THREE from "three";
import Loader from "./Loader";
const ModelView = ({
  index,
  item,
  controlRef,
  gsapType,
  size,
  setRotationState,
  groupRef,
}) => {
  return (
    <View
      id={gsapType}
      index={index}
      className={`w-full h-full absolute ${index === 2 ? "right-[-100%]" : ""}`}
    >
     <ambientLight intensity={0.5}/>
      <PerspectiveCamera makeDefault position={[0, 0, 5]} />
      <Lights />
      <OrbitControls
        makeDefault
        ref={controlRef}
        enableZoom={false}
        enablePan={false}
        rotateSpeed={0.5}
        target={new THREE.Vector3(0, 0, 0)}
        onEnd={() => setRotationState(controlRef.current.getAzimuthalAngle())}
      />
      <group
        ref={groupRef}
        name={`${index === 1}?"small":"large`}
        position={[0, 0, 0]}
      >
        <Suspense fallback={<Loader/>}>
          <Iphone
            item={item}
            size={size}
            scale={index === 1 ? [15, 15, 15] : [17, 17, 17]}
          />
        </Suspense>
      </group>
    </View>
  );
};

export default ModelView;
