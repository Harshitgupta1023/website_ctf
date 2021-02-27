import React from "react";
import Slidebar from "../layout/Slidebar";
import Cryptoquestion from "../layout/Cryptoquestion";

export default function Reverseengineering() {
  return (
    <div style={{ backgroundColor: "white" }}>
      <Slidebar />
      <div style={{ marginTop: "10%", marginLeft: "10%" }}>
        <Cryptoquestion />
      </div>
    </div>
  );
}
