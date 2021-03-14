import React from "react";
import Carousel from "react-material-ui-carousel";
import { Paper, Button } from "@material-ui/core";
import Contacts from "../Components/Contacts";
import Home from "@material-ui/icons/Home";
import FiberManualRecordTwoToneIcon from "@material-ui/icons/FiberManualRecordTwoTone";
function Example(props) {
  var items = [
    {
      name: "Hash",
      description: "Probably the most random thing you have ever seen!",
    },
    {
      name: "Random Name #2",
      description: "Hello World!",
    },
    {
      name: "Random Name #3",
      description: "Hello World!",
    },
  ];

  return (
    <Carousel IndicatorIcon={<FiberManualRecordTwoToneIcon fontSize="small" />}>
      {items.map((item, i) => (
        <Item key={i} item={item} />
      ))}
    </Carousel>
  );
}

function Item(props) {
  return (
    <Paper style={{ width: 1300, margin: 100, height: 400 }}>
      <h2>{props.item.name}</h2>
      <p>{props.item.description}</p>
      <Contacts />
      <Button className="CheckButton">Check it out!</Button>
    </Paper>
  );
}
export default function Carousell() {
  return (
    <div>
      <Example />
    </div>
  );
}
