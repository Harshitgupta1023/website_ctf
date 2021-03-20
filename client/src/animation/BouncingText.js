import React from "react";
import BouncingText from "react-bouncing-text";

export default function MyBouncingText(props) {
  return (
    <BouncingText text={props.text} hoverable delay={10} duration={1000} />
  );
}
