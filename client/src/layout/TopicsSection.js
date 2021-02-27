import React, { useState } from "react";
import { sectionData } from "../data/constants";
import SectionCard from "../Components/SectionCard";

export default function TopicsSection() {
  const [sections] = useState(sectionData);
  return (
    <div className="topics-section">
      {sections.map((section) => (
        <SectionCard
          key={section.id}
          className="section"
          title={section.title}
          image={section.image}
          details={section.details}
          link={section.link}
        />
      ))}
    </div>
  );
}
