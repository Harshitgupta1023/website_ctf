import React from "react";
import "../App.css";

import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";
import { makeStyles } from "@material-ui/core/styles";

import Typing from "../animation/Typing";
import { home } from "../data/constants";
import video from "../media/video.mp4";

import ColorfulText from "../animation/ColorfulText";
import Carousel from "../layout/Carousel";
import Copyright from "../Components/Copyright";
import Navbar from "../layout/Navbar";
import Handels from "../Components/Handels";
import CategoriesSection from "../Components/CategoriesSection";

export default function Home() {
  const classes = useStyles();
  return (
    <div>
      <div component="main" className={classes.navbar}>
        <Navbar login tools home getStarted />
      </div>
      <hr className={classes.hr}></hr>
      <div>
        <Grid container component="main" className={classes.root}>
          <Grid item xs={12} sm={8} md={5}>
            <div className={classes.paper}>
              <Typography component="h1" variant="h5">
                <Typing
                  words={[
                    "capture",
                    2000,
                    "the",
                    2000,
                    "flag",
                    2000,
                    "IIT Jodhpur",
                    2000,
                  ]}
                />
              </Typography>
            </div>
          </Grid>
          <Grid item xs={false} sm={4} md={7}>
            <video src={video} muted loop autoPlay className={classes.video} />
          </Grid>
        </Grid>
        <hr className={classes.hr}></hr>
        <div
          xs={12}
          sm={8}
          md={5}
          component="main"
          className={classes.categoriesSection}
        >
          <div className={classes.categorycard}>
            <CategoriesSection />
          </div>
        </div>
        <div
          xs={12}
          sm={8}
          md={5}
          component="main"
          className={classes.carousel}
        >
          <Carousel />
        </div>
        <div
          xs={12}
          sm={8}
          md={5}
          component="main"
          className={classes.handleContainer}
        >
          <Handels />
          <ColorfulText text="SeekhoCTF" />
        </div>
        <div xs={12} sm={8} md={5} component="main" className={classes.footer}>
          <Copyright />
        </div>
      </div>
    </div>
  );
}

const useStyles = makeStyles((theme) => ({
  navbar: {
    backgroundColor: home.backgroundPrimary,
    height: "12vh",
  },

  hr: {
    height: "0.5px",
    borderWidth: "0",
    color: "#363B46",
    backgroundColor: "#363B46",
  },
  root: {
    backgroundColor: home.backgroundPrimary,
    height: "85vh",
  },
  paper: {
    margin: theme.spacing(8, 4),
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    backgroundColor: home.backgroundPrimary,
  },
  categoriesSection: {
    backgroundColor: home.backgroundSecondary,
    padding: "2% 10%",
  },
  categorycard: {
    border: "2px solid white",
    boxShadow: "0px 0px 5px 3px grey",
  },
  carousel: {
    backgroundColor: home.backgroundPrimary,
    height: "100h",
  },
  handleContainer: {
    backgroundColor: home.backgroundSecondary,
    height: "25vh",
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
  },
  footer: {
    backgroundColor: home.backgroundPrimary,
    height: "6vh",
    fontSize: "1rem",
    color: "white",
    padding: "0.5% 42% 0",
  },
  video: {
    width: "90%",
    marginLeft: "10%",
    clipPath: "polygon(10% 0, 100% 0, 100% 100%, 0% 100%)",
    height: "84.8vh",
    objectFit: "cover",
    top: "0",
    bottom: "0",
  },
}));
