import React, { useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import ReactCardFlip from "react-card-flip";

import Card from "@material-ui/core/Card";
import CardActions from "@material-ui/core/CardActions";
import CardContent from "@material-ui/core/CardContent";
import Button from "@material-ui/core/Button";
import Typography from "@material-ui/core/Typography";
import { button } from "../data/constants";

export default function ToolsCard(props) {
  const [isflip, setFlip] = useState(false);
  const handleflip = () => {
    setFlip(!isflip);
  };
  const classes = useStyles();

  return (
    <div>
      <ReactCardFlip isFlipped={isflip} flipDirection="vertical">
        <div className={classes.cardDiv}>
          <Card className={classes.root} style={{ backgroundColor: "#1A202C" }}>
            <CardContent>
              <Typography className={classes.title}>{props.title}</Typography>
            </CardContent>
            <CardActions className={classes.buttonContainer}>
              <Button className={classes.buttonStyle} onClick={handleflip}>
                Learn More
              </Button>
            </CardActions>
          </Card>
        </div>
        <div className={classes.cardDiv}>
          <Card
            className={classes.root}
            style={{ backgroundColor: "#52668c" }}
            onClick={handleflip}
          >
            <CardContent>
              <Typography className={classes.title}>{props.title}</Typography>
            </CardContent>
            <CardActions className={classes.buttonContainer}>
              <Button
                target="_blank"
                className={classes.buttonStyle}
                href={props.description_link}
              >
                Description
              </Button>
            </CardActions>
          </Card>
        </div>
      </ReactCardFlip>
    </div>
  );
}

const useStyles = makeStyles({
  root: {
    width: "100%",
    height: 200,
  },
  title: {
    fontSize: "2rem",
    fontFamily: "'Roboto', cursive",
    color: "gold",
    textAlign: "center",
  },
  buttonContainer: {
    position: "absolute",
    bottom: 25,
    right: 30,
    width: "80%",
  },
  buttonStyle: {
    width: "100%",
    display: "block",
    fontSize: "1rem",
    backgroundColor: button.buttonBackgroundColor,
    color: "white",
    padding: "8px 16px",
    textAlign: "center",
    "&:hover": {
      backgroundColor: button.buttonHoverColor,
    },
  },

  cardDiv: {
    padding: 20,
  },
});
