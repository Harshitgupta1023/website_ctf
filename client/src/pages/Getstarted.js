import React from "react";
import TopicsSection from "../layout/TopicsSection";
import Navbar from "../layout/Navbar";

function Getstarted() {
  return (
    <div>
      <Navbar home="true" />
      <TopicsSection />
    </div>
  );
}

export default Getstarted;
