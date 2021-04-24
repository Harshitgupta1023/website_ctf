import React from "react";
import Slidebar from "../layout/Slidebar";
import Allquestion from "../layout/Allquestion";
import Navbar from "../layout/Navbar";

export default function ProblemsPage({ category, location }) {
  return (
    <div
    // style={{
    //   minHeight: "100vh",
    //   backgroundImage: "radial-gradient(circle, #486b9e  , #040D21 )",
    // }}
    >
      <Navbar createProblems tools home />
      <Slidebar
        // add links
        style={{}}
      />
      <div style={{ marginLeft: 100, marginTop: 40 }}>
        <Allquestion category={location.pathname.substr(1)} />
      </div>
    </div>
  );
}
