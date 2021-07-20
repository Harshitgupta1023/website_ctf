import React, { useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import ReactCardFlip from "react-card-flip";

import Card from "@material-ui/core/Card";
import CardActions from "@material-ui/core/CardActions";
import CardContent from "@material-ui/core/CardContent";
import Button from "@material-ui/core/Button";
import Typography from "@material-ui/core/Typography";
import { button } from "../data/constants";

const useStyles = makeStyles({
  root: {
    width: 275,
    height: 250,
    padding: 10,
    marginRight: 10,
  },
  title: {
    fontSize: "2.5rem",
    fontFamily: "'Roboto', cursive",
    color: "gold",
    marginBottom: "10%",
    textAlign: "center",
  },

  smallTitle: {
    fontFamily: "'Roboto', cursive",
    fontSize: "1.8rem",
    color: "gold",
    marginBottom: "15%",
    textAlign: "center",
  },

  buttonStyle: {
    width: "100%",
    display: "block",
    fontSize: "1rem",
    backgroundColor: button.buttonBackgroundColor,
    border: "none",
    color: "white",
    padding: "8px 16px",
    textAlign: "center",
    margin: "2px 1px",
    opacity: "1",
    zIndex: "1",
    transition: "0.3s",
    "&:hover": {
      backgroundColor: button.buttonHoverColor,
    },
  },

  cardDiv: {
    margin: "10% 0% 10% 10%",
  },
});

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
            <CardActions>
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
              <Typography className={classes.smallTitle}>
                {props.title}
              </Typography>
            </CardContent>
            <CardActions>
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
