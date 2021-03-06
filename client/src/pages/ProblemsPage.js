import React from "react";
import Slidebar from "../layout/Slidebar";
import Allquestion from "../layout/Allquestion";
import Navbar from "../layout/Navbar";
export default function ProblemsPage({ category }) {
  return (
    <div>
      <Navbar />
      <Slidebar />
      <div style={{ marginLeft: 100, marginTop: 18 }}>
        <Allquestion category={category} />
      </div>
    </div>
  );
}
