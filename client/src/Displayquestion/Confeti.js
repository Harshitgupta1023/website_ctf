import React, { useEffect } from "react";
import Confetti from "react-confetti";
import Typing from "../animation/Congratulations";

export default function Confeti({ setShow }) {
  // Sets the time for how long the Confetti is Displayed
  useEffect(() => {
    setTimeout(() => {
      setShow(false);
    }, 15000);
  }, [setShow]);
  return (
    <div>
      <Confetti width={600} height={600} />
      <div
        style={{
          position: "absolute",
          bottom: "45%",
          left: "24%",
          fontSize: "1rem",
          fontFamily: "Sofia",
          color: "gold",
          backgroundColor: "#1A202C",
        }}
      >
        <Typing words={["🎉Congrats ", 2500, "You solved It", 2500]} />

        {/* 🎉 Congratulations {" "} */}
      </div>
    </div>
  );
}
