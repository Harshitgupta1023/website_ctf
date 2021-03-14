import React from "react";
import Navbar from "../layout/Navbar";
import Typing from "../animation/Typing";
import Carousel from "../layout/Carousel";
function Home() {
  return (
    <div>
      <Navbar condition="false" />
      <Typing
        words={[
          "capture",
          1000,
          "the",
          1000,
          "flag",
          1000,
          "IIT Jodhpur",
          1000,
        ]}
      />
      <Carousel />
    </div>
  );
}

export default Home;
