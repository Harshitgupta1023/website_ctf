import React from "react";
import Confetti from "react-confetti";

export default function Confeti() {
  return (
    <div>
      <Confetti width={600} height={600} />
      <p
        style={{
          position: "absolute",
          bottom: 350,
          left: 120,
          fontSize: 40,
          fontFamily: "Sofia",
          color: "gold",
          backgroundColor: "#424242",
        }}
      >
        🎉 Congratulation{" "}
      </p>
    </div>
  );
}
