import React, { useState } from "react";
import GlitchSquiggly from "react-glitch-effect/core/GlitchSquiggly";

export default function MyComponent(props) {
  return (
    <div style={{ marginLeft: 50, height: 70, width: "80%" }}>
      <GlitchSquiggly>
        <p>{props.text}</p>
      </GlitchSquiggly>
    </div>
  );
}
