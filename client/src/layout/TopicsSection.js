import React, { useState } from "react";
import { sectionData } from "../constants";
import SectionCard from "../Components/SectionCard";

export default function TopicsSection() {
    const [sections, setSections] = useState(sectionData);
    return (
        <div className="topics-section">
            {sections.map((section, ind) => (
                <SectionCard
                    key={ind}
                    className="section"
                    title={section.title}
                    image={section.image}
                    details={section.details}
                />
            ))}
        </div>
    );
}
