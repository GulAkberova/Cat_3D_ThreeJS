import React from "react";
import { HexColorPicker } from "react-colorful";
import { useSnapshot } from "valtio";

function Palette({ state }) {
  const snap = useSnapshot(state);
  return (
    <>
      <div
        style={{
          position: "absolute",
          top: "74px",
          left: "70px",
        }}
      >
        <HexColorPicker
          color={snap.items[snap.current]}
          onChange={(color) => (state.items[snap.current] = color)}
        />
        <h2 style={{ color: "white" }}>{state.current}</h2>
      </div>{" "}
    </>
  );
}

export default Palette;
