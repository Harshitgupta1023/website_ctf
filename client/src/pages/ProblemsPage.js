import React from "react";
import Slidebar from "../layout/Slidebar";
import ProblemsSection from "../layout/ProblemsSection";
import Navbar from "../layout/Navbar";

export default function ProblemsPage({ category }) {
    return (
        <div>
            <Navbar />
            <Slidebar style={{}} />
            <div>
                <ProblemsSection category={category} />
            </div>
        </div>
    );
}
