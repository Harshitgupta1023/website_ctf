import React from "react";
import Navbar from "../layout/Navbar";
import Slidebar from "../layout/Slidebar";
import TopicsSection from "../layout/TopicsSection";
export default function Crypto() {
  return (
    <div style={{ backgroundColor: "white" }}>
      {/* <Navbar /> */}
      <Slidebar />
      <div style={{ marginTop: "10%", marginLeft: "10%" }}>
        <TopicsSection />
      </div>
    </div>
  );
}
