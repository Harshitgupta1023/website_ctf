import React from "react";
import TopicsSection from "../layout/TopicsSection";
import Navbar from "../layout/Navbar";

function Home() {
    return (
        <div>
            <Navbar login tools home createProblems />
            <TopicsSection />
        </div>
    );
}

export default Home;
