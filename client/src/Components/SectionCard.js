import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import Card from "@material-ui/core/Card";
import CardActionArea from "@material-ui/core/CardActionArea";
import CardContent from "@material-ui/core/CardContent";
import CardMedia from "@material-ui/core/CardMedia";
import Typography from "@material-ui/core/Typography";
import { Link } from "react-router-dom";
import Grow from "@material-ui/core/Grow";

const useStyles = makeStyles({
  root: {
    maxWidth: 370,
    marginBottom: 80,
    opacity: 0.7,
    // transition: "all .3s ease-in-out",
    // "&:hover": { transform: "scale3d(1.1, 1.1, 1.1)", opacity: 1 },
  },
  categoriesHeading: {
    fontFamily: "'Cormorant Unicase', serif",
    fontSize: "1.85rem",
    color: "#ffec00",
  },
  categoriesText: {
    fontFamily: "",
    fontWeight: 300,
    fontSize: "1.2rem",
    color: "white",
  },
  media: {
    height: 100,
  },
});

export default function SectionCard(props) {
  const classes = useStyles();
  const [checked] = React.useState(true);
  const { image, title, details, link, id } = props;
  return (
    <Grow
      in={checked}
      style={{ transformOrigin: "0 0 0" }}
      {...(checked ? { timeout: 1000 * (id % 3 === 0 ? 3 : id % 3) } : {})}
    >
      <Card className={classes.root} variant="outlined">
        <Link style={{ textDecoration: "none" }} to={link} className="links">
          <CardActionArea>
            <CardMedia
              className={classes.media}
              image={require(`../media/${image}`).default}
              title={title}
              style={{ height: "200px" }}
            />
            <CardContent>
              <Typography
                className={classes.categoriesHeading}
                gutterBottom
                variant="h5"
                component="h2"
              >
                {title}
              </Typography>
              <Typography
                variant="body2"
                className={classes.categoriesText}
                color="textSecondary"
                component="p"
              >
                {details}
              </Typography>
            </CardContent>
          </CardActionArea>
        </Link>
      </Card>
    </Grow>
  );
}
