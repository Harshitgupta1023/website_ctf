import React from "react";
import Confetti from "react-confetti";
import Typing from "../animation/Congratulations";


export default function Confeti() {
  return (
    <div>
      <Confetti width={600} height={600} />
      <p
        style={{
          position: "absolute",
          bottom: "45%",
          left: "27%",
          fontSize: "1rem",
          fontFamily: "Sofia",
          color: "gold",
          backgroundColor: "#1A202C",
        }}
      >
  
                <Typing
                  words={[
                    '🎉Congrats ',
                    2500,
                    "You solved It",
                    2500
                  ]}
                />

        {/* 🎉 Congratulations {" "} */}
      </p>
    </div>
  );
}
