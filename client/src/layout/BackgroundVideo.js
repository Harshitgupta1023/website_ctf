import React from "react";
import bgVideo from "../media/bg-video.mp4";

export default function BackgroundVideo() {
    return (
        <div className="showcase">
            <video src={bgVideo} muted loop autoPlay />
        </div>
    );
}
