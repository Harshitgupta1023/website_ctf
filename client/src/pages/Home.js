import React from "react";
import TopicsSection from "../layout/TopicsSection";
import Navbar from "../layout/Navbar";
import Typing from "../animation/Typing";
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
    </div>
  );
}

export default Home;
