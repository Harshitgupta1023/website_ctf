import React from "react";
import Carousel from "react-material-ui-carousel";
import Paper from "@material-ui/core/Paper";
// import Contacts from "../Components/Contacts";
import FiberManualRecordTwoToneIcon from "@material-ui/icons/FiberManualRecordTwoTone";
import TeamCard from "../Components/TeamCard";

var items = [
  {
    name: "About Us",
    description:
      "Our main motivation behind making this site was to solve the problem that we were facing while doing CTF and that was there was not a single site that contained both the questions and the information or sources to study CTF techniques, so we had to search on different sites that was very cumbersome process. So we took this initiative to develop a site that will contain both the questions and the sources so one can find all the things needed to start CTF at a single place.",
  },
  {
    name: "Our Team",
  },
  {
    name: "Upcoming Contests",
    description: "Yet to be Announced ...",
  },
];

function Item(props) {
  return (
    <Paper style={{ width: "100%", height: 550, backgroundColor: "#1A202C" }}>
      <div
        style={{
          padding: "6% 30% 0%",
        }}
      >
        <p
          style={{
            fontFamily: "'Playfair Display', serif",
            fontWeight: "bolder",
            fontSize: "4rem",
            color: "gold",
            marginBottom: "5%",
          }}
        >
          {props.item.name}
        </p>
        <h3 style={{ fontFamily: "'Roboto', sans-serif" }}>
          {props.item.description}
        </h3>
      </div>

      {/* <Contacts /> */}
    </Paper>
  );
}
export default function Carousell() {
  return (
    <div>
      <Carousel
        IndicatorIcon={<FiberManualRecordTwoToneIcon fontSize="small" />}
      >
        {items.map((item, i) =>
          i !== 1 ? <Item key={i} item={item} /> : <TeamCard />
        )}
      </Carousel>
    </div>
  );
}
