import React from "react";
import TopicsSection from "../layout/TopicsSection";
import Navbar from "../layout/Navbar";

function Home() {
    return (
        <div className="home">
            <Navbar />
            <TopicsSection />
        </div>
    );
}

export default Home;
