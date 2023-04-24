import { Suspense, useRef, useEffect, useState } from "react";
import "./App.css";
import { Canvas, useFrame } from "@react-three/fiber";
import { Cat } from "./components/Cat";
import {
  ContactShadows,
  Environment,
  OrbitControls,
  Stars,
} from "@react-three/drei";
import { proxy, useSnapshot } from "valtio";
import Palette from "./components/Palette";

// const Box = (props) => {
//   const ref = useRef();
//   useFrame((state, delta) => (ref.current.rotation.x += 0.01));

//   return (
//     <mesh ref={ref} {...props} position={[0, 0, 0]}>
//       <boxBufferGeometry />
//       <meshBasicMaterial color={"#c814ee"} />
//     </mesh>
//   );
// };

const state = proxy({
  current: null,
  items: {
    belly: "#fff",
    "eyes | sclera": "#fff",
    "eyes | pupil": "#fff",
    "leaf | body": "#0000ff",
    "leaf | stalk": "#fff",
    nose: "#fff",
    whiskers: "#fff",
    skin: "#000",
    claws: "#fff",
    // foot: "#0000ff",
  },
});

function App() {
  const [hovered, set] = useState(null);
  const snap = useSnapshot(state);

  useEffect(() => {
    const cursor = `<svg width="54" height="54" fill="none" xmlns="http://www.w3.org/2000/svg"><g clip-path="url(#clip0)"><path fill="rgba(255, 255, 255, 0.5)" d="M29.5 54C43.031 54 54 43.031 54 29.5S43.031 5 29.5 5 5 15.969 5 29.5 15.969 54 29.5 54z" stroke="#000"/><g filter="url(#filter0_d)"><path d="M29.5 47C39.165 47 47 39.165 47 29.5S39.165 12 29.5 12 12 19.835 12 29.5 19.835 47 29.5 47z" fill="${snap.items[hovered]}"/></g><path d="M2 2l11 2.947L4.947 13 2 2z" fill="#000"/><text fill="#000" style="white-space:pre" font-family="Inter var, sans-serif" font-size="10" letter-spacing="-.01em"><tspan x="35" y="63">${hovered}</tspan></text></g><defs><clipPath id="clip0"><path fill="#fff" d="M0 0h64v64H0z"/></clipPath><filter id="filter0_d" x="6" y="8" width="47" height="47" filterUnits="userSpaceOnUse" color-interpolation-filters="sRGB"><feFlood flood-opacity="0" result="BackgroundImageFix"/><feColorMatrix in="SourceAlpha" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0"/><feOffset dy="2"/><feGaussianBlur stdDeviation="3"/><feColorMatrix values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0.15 0"/><feBlend in2="BackgroundImageFix" result="effect1_dropShadow"/><feBlend in="SourceGraphic" in2="effect1_dropShadow" result="shape"/></filter></defs></svg>`;
    const auto = `<svg width="54" height="54" fill="none" xmlns="http://www.w3.org/2000/svg"><path fill="rgba(255, 255, 255, 0.5)" d="M29.5 54C43.031 54 54 43.031 54 29.5S43.031 5 29.5 5 5 15.969 5 29.5 15.969 54 29.5 54z" stroke="#000"/><path d="M2 2l11 2.947L4.947 13 2 2z" fill="#000"/></svg>`;
    document.body.style.cursor = `url('data:image/svg+xml;base64,${btoa(
      hovered ? cursor : auto
    )}'), auto`;
  }, [hovered, snap.items]);
  const onPointerOver = (event) => {
    event.stopPropagation();
    set(event.object.material.name);
  };
  const onPointerOut = (event) => {
    event.intersections.length === 0 && set(null);
  };
  const onPointerDown = (event) => {
    event.stopPropagation();
    state.current = event.object.material.name;
  };
  const onPointerMissed = (event) => {
    state.current = null;
  };
  return (
    <>
      <Palette state={state} />
      <Canvas>
        {/* Ulduzlar */}
        <Stars />
        {/* Uzay boslugu */}
        <OrbitControls />
        {/* Kolge */}
        <ambientLight />
        {/* Isiq */}
        <spotLight intensity={1} position={[10, 10, 10]} />
        <Suspense fallback={null}>
          <Cat
            state={state}
            onPointerOver={onPointerOver}
            onPointerOut={onPointerOut}
            onPointerDown={onPointerDown}
            onPointerMissed={onPointerMissed}
          />
          <Environment files="src/royal_esplanade_1k.hdr" />
          <ContactShadows
            rotation-x={Math.PI / 2}
            position={[0, -2.4, 0]}
            opacity={0.7}
            width={10}
            height={10}
            blur={2}
            far={3}
            style={{
              position: "absolute",
              zIndex: "2",
            }}
          />
        </Suspense>
        {/* <Box position={[-1.2, 0, 0]} /> */}
      </Canvas>
    </>
  );
}

export default App;
