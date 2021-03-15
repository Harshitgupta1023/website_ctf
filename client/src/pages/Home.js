import React from "react";
import Navbar from "../layout/Navbar";
import TopicsSection from "../layout/TopicsSection";
function Home() {
  return (
    <div>
      <Navbar login tools home createProblems />
      <TopicsSection />
    </div>
  );
}

export default Home;
