import React, { useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import ReactCardFlip from "react-card-flip";

import Card from "@material-ui/core/Card";
import CardActions from "@material-ui/core/CardActions";
import CardContent from "@material-ui/core/CardContent";
import Button from "@material-ui/core/Button";
import Typography from "@material-ui/core/Typography";

const useStyles = makeStyles({
  root: {
    minWidth: 275,
    height: 200,
  },
  title: {
    fontSize: 14,
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
        <div>
          <Card className={classes.root} style={{ backgroundColor: "blue" }}>
            <CardContent>
              <Typography variant="h5" component="h2">
                {props.title}
              </Typography>
            </CardContent>
            <CardActions>
              <Button size="small" onClick={handleflip}>
                Learn More
              </Button>
            </CardActions>
          </Card>
        </div>
        <div style={{ backgroundColor: "red" }}>
          <Card
            className={classes.root}
            style={{ backgroundColor: "red" }}
            onClick={handleflip}
          >
            <CardActions>
              <Button size="small" href={props.description_link}>
                Description
              </Button>
              <Button size="small" href={props.usage_link}>
                Lorem Ipsum
              </Button>
            </CardActions>
          </Card>{" "}
        </div>
      </ReactCardFlip>
    </div>
  );
}
