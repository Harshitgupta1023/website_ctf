import React, { useState, useEffect } from "react";
import { sectionData } from "../data/constants";
import SectionCard from "../Components/SectionCard";
import Grow from "@material-ui/core/Grow";

export default function TopicsSection() {
    const [sections] = useState(sectionData);
    const [checked, setChecked] = useState(false);
    useEffect(() => {
        setTimeout(() => {
            setChecked(true);
        }, 1000);
    }, []);
    return (
        <div className="topics-section">
            {sections.map((section, index) => (
                <Grow
                    key={section.id}
                    in={checked}
                    // style={{ transformOrigin: "0 0 0" }}
                    // {...(checked ? { timeout: index * 1000 } : {})}
                    className="section"
                >
                    <SectionCard
                        title={section.title}
                        image={section.image}
                        details={section.details}
                        link={section.link}
                    />
                </Grow>
            ))}
        </div>
    );
}
