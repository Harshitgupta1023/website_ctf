import React from "react";
import "../App.css";
import Navbar from '../layout/Navbar';
import Avatar from "@material-ui/core/Avatar";
import Button from "@material-ui/core/Button";
import CssBaseline from "@material-ui/core/CssBaseline";
import TextField from "@material-ui/core/TextField";
import Link from "@material-ui/core/Link";
import Paper from "@material-ui/core/Paper";
import Box from "@material-ui/core/Box";
import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";
import { makeStyles } from "@material-ui/core/styles";
import Typing from "../animation/Typing";
import {home} from "../data/constants";
import video from "../media/video.mp4";
import InstagramIcon from '@material-ui/icons/Instagram';
import GitHubIcon from '@material-ui/icons/GitHub';
import EmailIcon from '@material-ui/icons/Email';
import ColorfulText from "../animation/ColorfulText";
import Carousel from "../layout/Carousel";
import crypto from "../media/cryptography.jpg";
import forensics from "../media/forensics.jpg";
import reverseEngineering from "../media/reverse-engineering.jpg";
import webExploitation from "../media/web-exploitation.jpg";
import binaryExploitation from "../media/binary-exploitation.jpg";


function Copyright() {
  return (
    <div>

      {'Copyright © '}
      <Link color="inherit" href="https://google.com">
        SeekhoCTF
      </Link>{' '}
      {new Date().getFullYear()}
      {'.'}
    </div>
  );}

  
  function CategoriesSection(){
    const classes = useStyles();
    return (
      <div>
          <p style={{
            margin: "0 40% 4%",
            fontSize: "3.5rem",
            color: "white",
            fontWeight: "bolder"
          }}>Categories</p>
  
          <div  xs={12} sm={8} md={5} className={classes.categoriesRow}>

            <img src={crypto} className={classes.imageLayoutLeft} ></img>

            <h1 className={classes.headingCategoriesSection}>Cryptography</h1>

            <p className={classes.paraCategoriesSection}>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Mauris auctor vehicula felis id ornare. Nulla tristique nibh in iaculis tincidunt. Suspendisse velit elit, dictum ornare dui vel, vestibulum tristique tellus. Aliquam sit amet aliquam eros. Nulla ut felis faucibus mauris pellentesque ultricies. Phasellus eget tortor ac orci aliquam bibendum. Sed posuere sagittis nulla, vel cursus leo ullamcorper in. Phasellus mattis, mauris quis ornare pretium, ante sem convallis odio, ut vestibulum enim lectus vitae ante. Integer at erat euismod, lobortis nibh at, commodo orci. Nulla vitae sollicitudin purus.
            </p>

          </div>


          <div  xs={12} sm={8} md={5} className={classes.categoriesRow}>

            <img src={webExploitation} className={classes.imageLayoutRight} ></img>

            <h1 className={classes.headingCategoriesSection}>Web Exploitation</h1>

            <p className={classes.paraCategoriesSection}>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Mauris auctor vehicula felis id ornare. Nulla tristique nibh in iaculis tincidunt. Suspendisse velit elit, dictum ornare dui vel, vestibulum tristique tellus. Aliquam sit amet aliquam eros. Nulla ut felis faucibus mauris pellentesque ultricies. Phasellus eget tortor ac orci aliquam bibendum. Sed posuere sagittis nulla, vel cursus leo ullamcorper in. Phasellus mattis, mauris quis ornare pretium, ante sem convallis odio, ut vestibulum enim lectus vitae ante. Integer at erat euismod, lobortis nibh at, commodo orci. Nulla vitae sollicitudin purus.
            </p>

          </div>


          <div  xs={12} sm={8} md={5} className={classes.categoriesRow}>

            <img src={binaryExploitation} className={classes.imageLayoutLeft} ></img>

            <h1 className={classes.headingCategoriesSection}>Binary Exploitation</h1>

            <p className={classes.paraCategoriesSection}>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Mauris auctor vehicula felis id ornare. Nulla tristique nibh in iaculis tincidunt. Suspendisse velit elit, dictum ornare dui vel, vestibulum tristique tellus. Aliquam sit amet aliquam eros. Nulla ut felis faucibus mauris pellentesque ultricies. Phasellus eget tortor ac orci aliquam bibendum. Sed posuere sagittis nulla, vel cursus leo ullamcorper in. Phasellus mattis, mauris quis ornare pretium, ante sem convallis odio, ut vestibulum enim lectus vitae ante. Integer at erat euismod, lobortis nibh at, commodo orci. Nulla vitae sollicitudin purus.
            </p>
          
          </div>


          <div  xs={12} sm={8} md={5} className={classes.categoriesRow}>

            <img src={forensics} className={classes.imageLayoutRight} ></img>

            <h1 className={classes.headingCategoriesSection}>Forensics</h1>

            <p className={classes.paraCategoriesSection}>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Mauris auctor vehicula felis id ornare. Nulla tristique nibh in iaculis tincidunt. Suspendisse velit elit, dictum ornare dui vel, vestibulum tristique tellus. Aliquam sit amet aliquam eros. Nulla ut felis faucibus mauris pellentesque ultricies. Phasellus eget tortor ac orci aliquam bibendum. Sed posuere sagittis nulla, vel cursus leo ullamcorper in. Phasellus mattis, mauris quis ornare pretium, ante sem convallis odio, ut vestibulum enim lectus vitae ante. Integer at erat euismod, lobortis nibh at, commodo orci. Nulla vitae sollicitudin purus.
            </p>
          
          </div>


          <div  xs={12} sm={8} md={5} className={classes.categoriesRow}>

            <img src={reverseEngineering} className={classes.imageLayoutLeft} ></img>

            <h1 className={classes.headingCategoriesSection}>Reverse Engineering</h1>

            <p className={classes.paraCategoriesSection}>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Mauris auctor vehicula felis id ornare. Nulla tristique nibh in iaculis tincidunt. Suspendisse velit elit, dictum ornare dui vel, vestibulum tristique tellus. Aliquam sit amet aliquam eros. Nulla ut felis faucibus mauris pellentesque ultricies. Phasellus eget tortor ac orci aliquam bibendum. Sed posuere sagittis nulla, vel cursus leo ullamcorper in. Phasellus mattis, mauris quis ornare pretium, ante sem convallis odio, ut vestibulum enim lectus vitae ante. Integer at erat euismod, lobortis nibh at, commodo orci. Nulla vitae sollicitudin purus.
            </p>
          
          </div>

      </div>
    );
  }




function Handles() {
  const classes = useStyles();
  return (
    <div>
      
      <a className={classes.handlesLinks} href="https://google.com" style={{
        marginLeft:"15%",
        marginRight: "18.5%",
      }} >
        <EmailIcon className={classes.handlesIcons}/>
      </a>

      
      <a   className={classes.handlesLinks} href="https://github.com/Harshitgupta1023/website_ctf.git" style={{
        marginRight: "18.5%",
      }}>
        <GitHubIcon className={classes.handlesIcons}/>
      </a>
      
      <a className={classes.handlesLinks} href="https://instagram.com">
        <InstagramIcon className={classes.handlesIcons}/>
      </a>
    </div>
  );
}

const useStyles = makeStyles((theme) => ({
  navbar:{
    backgroundColor: home.backgroundPrimary,
    height: "10vh"
  },

  hr:{
    height:"0.5px",
    borderWidth:"0",
    color:"#363B46",
    backgroundColor:"#363B46"
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
  categoriesSection:{
    backgroundColor: home.backgroundSecondary,
    height: "320vh",
    padding: "5% 10%"
  },
  carousel:{
    backgroundColor: home.backgroundPrimary,
    height: "100h",
  },
  handleSec:{
    padding: "2% 38%",
    backgroundColor: home.backgroundSecondary,
    height: "35vh"
  },
  footer: {
    backgroundColor: home.backgroundPrimary,
    height: "6vh",
    fontSize: "1rem",
    color:"white",
    padding: "0.5% 42% 0"
  },

  categoriesRow:{
  width: "80%",
  margin: "10% auto 15% auto",
  textAlign: "left",
  lineHeight: "1"
  },

  imageLayoutLeft:{
    width: "35%",
    borderRadius: "50%",
    float: "left",
    marginRight: "30px"
  },

  imageLayoutRight:{
    width: "35%",
    borderRadius: "50%",
    float: "right",
    marginLeft: "30px"
  },

  headingCategoriesSection:{
    color: "gold",
    marginBottom: "3%",
    fontSize: "2.5rem"
  },

  paraCategoriesSection:{
    color: "white",
    fontSize: "1rem",
    lineHeight: "1.2"
  },

  handlesIcons:{
    height: "35px",
    width: "35px",
    color: "white",
  },

  handlesLinks:{
    "&:hover": {
      backgroundColor: "#9c9c9c",
  },
    paddingTop: "22px",
    borderRadius: "30%"

  }



}));




export default function Home(){
  const classes = useStyles();
   return (
    <div>
    <div container component="main" className= {classes.navbar}>
    
      <Navbar login tools home createProblems getStarted/>
      {/* <TopicsSection /> */}
  
    </div>
    <hr className={classes.hr}></hr>
    <div>
     <Grid container component="main" className= {classes.root}>
      
      <Grid item xs={12} sm={8} md={5} >
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
      <Grid item xs={false} sm={4} md={7} >
        <video src={video} muted loop autoPlay style={{
          width: "90%",
          marginLeft:"10%",
          clipPath: "polygon(10% 0, 100% 0, 100% 100%, 0% 100%)",
          height: "84.8vh",
          objectFit: "cover",
          top: "0",
          bottom:"0"
                  }} />
      </Grid>
      </Grid>
      <hr className={classes.hr}></hr>
      <div xs={12} sm={8} md={5} container component="main" className={classes.categoriesSection}> 
         <CategoriesSection/>         
      </div>
      <div xs={12} sm={8} md={5} container component="main" className={classes.carousel}> 
                  <Carousel/>
      </div>
      <div xs={12} sm={8} md={5} container component="main" className={classes.handleSec}>
          <Handles/>
          <ColorfulText/>
      </div>
      <div xs={12} sm={8} md={5} container component="main" className={classes.footer}>
      <Copyright />
      </div>
    </div>
    </div>

   )
}
