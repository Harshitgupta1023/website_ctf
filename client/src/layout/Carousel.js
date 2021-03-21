import React from "react";
import Carousel from "react-material-ui-carousel";
import Paper from "@material-ui/core/Paper";
// import Contacts from "../Components/Contacts";
import FiberManualRecordTwoToneIcon from "@material-ui/icons/FiberManualRecordTwoTone";

var items = [
  {
    name: "About Us",
    description:
      "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.",
  },
  {
    name: "Our Team",
    description:
      "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.",
  },
  {
    name: "Upcoming Contests",
    description:
      "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.",
  },
];

function Item(props) {
  return (
    <Paper style={{ width: "100%", height: 650, backgroundColor: "#1A202C" }}>
      <div
        style={{
          padding: "7% 30% 0%",
        }}
      >
        <p
          style={{
            fontFamily: "'Playfair Display', serif",
            fontWeight: "bolder",
            fontSize: "4rem",
            color: "gold",
            marginBottom: "5%"
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
        {items.map((item, i) => (
          <Item key={i} item={item} />
        ))}
      </Carousel>
    </div>
  );
}
