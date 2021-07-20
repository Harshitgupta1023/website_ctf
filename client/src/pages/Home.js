import React from "react";
import "../App.css";
import Navbar from "../layout/Navbar";
import Link from "@material-ui/core/Link";
import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";
import { makeStyles } from "@material-ui/core/styles";
import Typing from "../animation/Typing";
import { home } from "../data/constants";
import video from "../media/video.mp4";
import InstagramIcon from "@material-ui/icons/Instagram";
import GitHubIcon from "@material-ui/icons/GitHub";
import EmailIcon from "@material-ui/icons/Email";
import ColorfulText from "../animation/ColorfulText";
import Carousel from "../layout/Carousel";
import crypto from "../media/crypto-logo.jpg";
import forensics from "../media/forensics.jpg";
import reverseEngineering from "../media/reverse-engineering.jpg";
import webExploitation from "../media/web-exploitation.jpg";
import binaryExploitation from "../media/binary-exploitation.jpg";

function Copyright() {
  return (
    <div>
      {"Copyright © "}
      <Link color="inherit" href="https://google.com">
        SeekhoCTF
      </Link>{" "}
      {new Date().getFullYear()}
      {"."}
    </div>
  );
}

function CategoriesSection() {
  const classes = useStyles();
  return (
    <div>
      <p
        style={{
          margin: "3% 40% 0%",
          fontSize: "3.5rem",
          color: "white",
          fontWeight: "bolder",
        }}
      >
        Categories
      </p>
      <hr
        style={{
          marginTop: "2%",
          marginLeft: "47.5%",
          borderStyle: "dotted none none",
          width: "5%",
          borderWidth: "10px",
          borderColor: "grey",
        }}
      />
      <div xs={12} sm={8} md={5} className={classes.categoriesRow}>
        <img
          src={crypto}
          className={classes.imageLayoutLeft}
          alt="Cryptography"
        ></img>

        <h1 className={classes.headingCategoriesSection}>Cryptography</h1>

        <p className={classes.paraCategoriesSection}>
          We can utilise banking apps, send sensitive information over the
          internet, and secure our privacy in general thanks to cryptography.
          However, a substantial portion of CTFs entails decrypting widely used
          encryption algorithms that have been implemented incorrectly. Although
          the math may appear intimidating, a basic understanding of the
          fundamental principles will usually allow you to uncover flaws and
          crack the code. The term "cryptography" refers to the practise of
          writing codes. When it comes to digital forensics, it's a technique
          for figuring out how data is put together for your investigation.
        </p>
      </div>

      <div xs={12} sm={8} md={5} className={classes.categoriesRow}>
        <img
          src={webExploitation}
          className={classes.imageLayoutRight}
          alt="Web Exploitation"
        ></img>

        <h1 className={classes.headingCategoriesSection}>Web Exploitation</h1>

        <p className={classes.paraCategoriesSection}>
          Various programming languages are used to create websites all around
          the world. While each programming language has its own set of
          vulnerabilities that developers should be aware of, there are some
          issues that are universal to the internet and can appear independently
          of the language or framework used. These flaws frequently appear in
          CTFs as web security challenges, in which the user must exploit a flaw
          to obtain access to a higher degree of privilege.
        </p>
      </div>

      <div xs={12} sm={8} md={5} className={classes.categoriesRow}>
        <img
          src={binaryExploitation}
          className={classes.imageLayoutLeft}
          alt="Binary Exploitation"
        ></img>

        <h1 className={classes.headingCategoriesSection}>
          Binary Exploitation
        </h1>

        <p className={classes.paraCategoriesSection}>
          Binaries, often known as executables, are computer programmes. The
          majority of the binaries you'll see in CTFs are Linux ELF files, with
          the occasional Windows executable thrown in for good measure. Binary
          Exploitation is a broad issue in Cyber Security that boils down to
          identifying a program's vulnerability and exploiting it to acquire
          control of a shell or change the program's functions.
        </p>
      </div>

      <div xs={12} sm={8} md={5} className={classes.categoriesRow}>
        <img
          src={forensics}
          className={classes.imageLayoutRight}
          alt="Forensics"
        ></img>

        <h1 className={classes.headingCategoriesSection}>Forensics</h1>

        <p className={classes.paraCategoriesSection}>
          File format analysis, steganography, memory dump analysis, and network
          packet capture analysis are examples of "forensics" challenges in a
          CTF. Any challenge involving the examination and processing of
          concealed data from static data files (rather than executable
          programmes or distant servers) could be classified as a forensics
          challenge.
        </p>
      </div>

      <div xs={12} sm={8} md={5} className={classes.categoriesRow}>
        <img
          src={reverseEngineering}
          className={classes.imageLayoutLeft}
          alt="Reverse Engineering"
        ></img>

        <h1 className={classes.headingCategoriesSection}>
          Reverse Engineering
        </h1>

        <p className={classes.paraCategoriesSection}>
          In a CTF, reverse engineering is the process of translating a compiled
          (machine code, bytecode) programme back into a more human readable
          version. The purpose of a reverse engineering task is frequently to
          understand the functionality of a given software so that deeper faults
          can be identified.
        </p>
      </div>
    </div>
  );
}

function Handles() {
  const classes = useStyles();
  return (
    <div>
      <a
        className={classes.handlesLinks}
        href="mailto: seekhoCTF@gmail.com"
        style={{
          marginLeft: "15%",
          marginRight: "18.5%",
        }}
        target="_blank"
        rel="noopener noreferrer"
      >
        <EmailIcon className={classes.handlesIcons} />
      </a>

      <a
        className={classes.handlesLinks}
        href="https://github.com/Harshitgupta1023/website_ctf.git"
        style={{
          marginRight: "18.5%",
        }}
        target="_blank"
        rel="noopener noreferrer"
      >
        <GitHubIcon className={classes.handlesIcons} />
      </a>

      <a
        className={classes.handlesLinks}
        href="https://instagram.com"
        target="_blank"
        rel="noopener noreferrer"
      >
        <InstagramIcon className={classes.handlesIcons} />
      </a>
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
    height: "285vh",
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
  handleSec: {
    padding: "2% 41.5%",
    backgroundColor: home.backgroundSecondary,
    height: "25vh",
  },
  footer: {
    backgroundColor: home.backgroundPrimary,
    height: "6vh",
    fontSize: "1rem",
    color: "white",
    padding: "0.5% 42% 0",
  },

  categoriesRow: {
    width: "80%",
    margin: "5% auto 12% auto",
    textAlign: "left",
    lineHeight: "1",
  },

  imageLayoutLeft: {
    width: "35%",
    height: "35%",
    borderRadius: "20%",
    float: "left",
    marginRight: "30px",
    padding: "3px",
    background: "linear-gradient(to right, gold, green)",
  },

  imageLayoutRight: {
    width: "35%",
    height: "35%",
    borderRadius: "20%",
    float: "right",
    marginLeft: "30px",
    padding: "3px",
    background: "linear-gradient(to right, gold,green)",
  },

  headingCategoriesSection: {
    color: "gold",
    marginBottom: "3%",
    fontSize: "2.5rem",
    fontFamily: "'Roboto', serif",
  },

  paraCategoriesSection: {
    color: "white",
    fontSize: "1rem",
    lineHeight: "1.2",
  },

  handlesIcons: {
    height: "35px",
    width: "35px",
    color: "white",
  },

  handlesLinks: {
    "&:hover": {
      // backgroundColor: "#777",
      opacity: "0.7",
    },
    paddingTop: "22px",
    borderRadius: "30%",
  },
}));

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
            <video
              src={video}
              muted
              loop
              autoPlay
              style={{
                width: "90%",
                marginLeft: "10%",
                clipPath: "polygon(10% 0, 100% 0, 100% 100%, 0% 100%)",
                height: "84.8vh",
                objectFit: "cover",
                top: "0",
                bottom: "0",
              }}
            />
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
          className={classes.handleSec}
        >
          <Handles />
          <ColorfulText text="SeekhoCTF" />
        </div>
        <div xs={12} sm={8} md={5} component="main" className={classes.footer}>
          <Copyright />
        </div>
      </div>
    </div>
  );
}
