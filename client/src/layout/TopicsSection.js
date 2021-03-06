import React, { useState } from "react";
import { sectionData } from "../data/constants";
import SectionCard from "../Components/SectionCard";
import { makeStyles } from "@material-ui/core/styles";
const useStyles = makeStyles(() => ({
  topppp: {
    transition: "all 0.2s ease-in-out",
    opacity: 0.7,
    "&:hover": {
      transform: "scale3d(1.1, 1.1, 1.1)",
      opacity: 1,
    },
  },
}));

export default function TopicsSection() {
  const [sections] = useState(sectionData);
  const classes = useStyles();
  return (
    <div className="topics-section">
      {sections.map((section, index) => (
        <div className={classes.topppp}>
          <SectionCard
            key={section.id}
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
