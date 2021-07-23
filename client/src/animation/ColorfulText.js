import React from "react";

import { AnimatedText } from "./AnimatedText";

function ColorfulText(props) {
  return (
    <div>
      <AnimatedText textColor="white" overlayColor="gold">
        {props.text}
      </AnimatedText>
    </div>
  );
}

export default ColorfulText;
