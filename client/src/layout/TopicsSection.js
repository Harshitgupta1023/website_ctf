import React, { useState } from "react";
import { sectionData } from "../data/constants";
import SectionCard from "../Components/SectionCard";

export default function TopicsSection() {
  const [sections] = useState(sectionData);
  return (
    <div className="topics-section">
      {sections.map((section, index) => (
        <div className="topppp">
          <SectionCard
            id={section.id}
            title={section.title}
            image={section.image}
            details={section.details}
            link={section.link}
          />
        </div>
      ))}
    </div>
  );
}
