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
import App from "../index1";
import Carousel from "../layout/Carousel";


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

  );
}


function Handles() {
  return (
    <div className="col-xs-12 col-sm-6 col-md-6 col-lg-6" >
      
      <a href="https://google.com" className= "linkingSystem" style={{
        marginLeft:"15%",
        marginRight: "18.5%",
        paddingTop: "22px"
       
      }} >
        <EmailIcon style={{
            height: "35px",
            width: "35px",
            borderRadius: "50%"
          }}/>
      </a>

      
      <a  href="https://github.com/Harshitgupta1023/website_ctf.git" className= "linkingSystem" style={{
        marginRight: "18.5%",
        paddingTop: "22px"
        
      }}>
        <GitHubIcon style={{
            height: "35px",
            width: "35px",
            borderRadius: "50%"
          }}/>
      </a>
      
      <a className= "linkingSystem" href="https://instagram.com" style={{
        paddingTop: "22px"
      }}>
        <InstagramIcon style={{
            height: "35px",
            width: "35px",
            borderRadius: "50%"
          }}/>
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
  infoAboutSite:{
    backgroundColor: home.backgroundSecondary,
    height: "200vh"
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
  }


}));


export default function Home(){
  const classes = useStyles();
   return (
    <div>
    <div container component="main" className= {classes.navbar}>
      <Navbar condition="false" />
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
      <div xs={12} sm={8} md={5} container component="main" className={classes.infoAboutSite}> 
                  
      </div>
      <div xs={12} sm={8} md={5} container component="main" className={classes.carousel}> 
                  <Carousel/>
      </div>
      <div xs={12} sm={8} md={5} container component="main" className={classes.handleSec}>
          <Handles/>
          <App/>
      </div>
      <div xs={12} sm={8} md={5} container component="main" className={classes.footer}>
      <Copyright />
      </div>
    </div>
    </div>

   )
}
