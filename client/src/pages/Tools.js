import React from "react";
import "../App.css";
import Navbar from '../layout/Navbar';
import Avatar from "@material-ui/core/Avatar";
import Button from "@material-ui/core/Button";
import CssBaseline from "@material-ui/core/CssBaseline";
import TextField from "@material-ui/core/TextField";
import Paper from "@material-ui/core/Paper";
import Box from "@material-ui/core/Box";
import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";
import { makeStyles } from "@material-ui/core/styles";
import {tools} from "../data/constants";
import { HashLink as Link } from 'react-router-hash-link';

const useStyles = makeStyles((theme) => ({
  navbar:{
    backgroundColor: tools.backgroundPrimary,
    height: "10vh"
  },

  hr:{
    height:"0.5px",
    borderWidth:"0",
    color:"#363B46",
    backgroundColor:"#363B46"
  },
  
  mainSection:{
    height: "110vh",
    backgroundColor: tools.backgroundPrimary,
  },

  cyptographySection:{
    height: "70vh",
    backgroundColor: tools.backgroundSecondary
  },

  webExploitationSection:{
    height: "70vh",
    backgroundColor:  tools.backgroundPrimary
  },

  binaryExploitationSection:{
    height: "70vh",
    backgroundColor: tools.backgroundSecondary
  },

  forensicsSection:{
    height: "70vh",
    backgroundColor: tools.backgroundPrimary
  },


  reverseEngineeringSection:{
    height: "70vh",
    backgroundColor: tools.backgroundSecondary
  },

  headingCategoriesSection:{
    color: "gold",
    marginBottom: "3%",
    fontSize: "2.5rem",
    marginLeft: "10%",
    display: "block"
  },

  paraCategoriesSection:{
    color: "white",
    fontSize: "1.5rem",
    lineHeight: "1.5",
    marginLeft: "10%"
  },

}));



export default function Tools() {
  const classes = useStyles();
  return (
    <div>
    <div container component="main" className= {classes.navbar}>
    
      <Navbar home getStarted/>
      {/* <TopicsSection /> */}
  
    </div>
    <hr className={classes.hr}></hr>
 
    <div xs={12} sm={8} md={5} container component="main" className={classes.mainSection}> 
      <p style={{
              margin: "0 40% 4%",
              fontSize: "3.5rem",
              color: "white",
              fontWeight: "bolder"
            }}>Categories</p>

          
          <Link to="tools#section-one" className={classes.headingCategoriesSection}>Cryptography</Link>
          <Link to="tools#section-two" className={classes.headingCategoriesSection}>Web Exploitation</Link>
          <Link to="tools#section-three" className={classes.headingCategoriesSection}>Binary Exploitation</Link>
          <Link to="tools#section-four" className={classes.headingCategoriesSection}>Forensics</Link>
          <Link to="tools#section-five" className={classes.headingCategoriesSection}>Reverse Engineering</Link>

      

    </div>
    <div xs={12} sm={8} md={5} container component="main" className={classes.cyptographySection} id="section-one"> 
      <h1 className={classes.headingCategoriesSection}>Cryptography</h1>
      <ul className={classes.paraCategoriesSection}>
        <li>
          Lorem Ipsum
        </li>
        <li>
          Lorem Ipsum
        </li>
        <li>
          Lorem Ipsum
        </li>
        <li>
          Lorem Ipsum
        </li>
      </ul> 
    </div>
    <div xs={12} sm={8} md={5} container component="main" className={classes.webExploitationSection} id="section-two"> 
      <h1 className={classes.headingCategoriesSection}>Web Exploitation</h1>
      <ul className={classes.paraCategoriesSection}>
        <li>
          Lorem Ipsum
        </li>
        <li>
          Lorem Ipsum
        </li>
        <li>
          Lorem Ipsum
        </li>
        <li>
          Lorem Ipsum
        </li>
      </ul> 
    </div>
    <div xs={12} sm={8} md={5} container component="main" className={classes.binaryExploitationSection} id="section-three"> 
      <h1 className={classes.headingCategoriesSection}>Binary Exploitation</h1> 
      <ul className={classes.paraCategoriesSection}>
        <li>
          Lorem Ipsum
        </li>
        <li>
          Lorem Ipsum
        </li>
        <li>
          Lorem Ipsum
        </li>
        <li>
          Lorem Ipsum
        </li>
      </ul>       
    </div>
    <div xs={12} sm={8} md={5} container component="main" className={classes.forensicsSection} id="section-four"> 
      <h1 className={classes.headingCategoriesSection}>Forensics</h1>     
      <ul className={classes.paraCategoriesSection}>
        <li>
          Lorem Ipsum
        </li>
        <li>
          Lorem Ipsum
        </li>
        <li>
          Lorem Ipsum
        </li>
        <li>
          Lorem Ipsum
        </li>
      </ul> 
    </div>
    <div xs={12} sm={8} md={5} container component="main" className={classes.reverseEngineeringSection} id="section-five"> 
      <h1 className={classes.headingCategoriesSection}>Reverse Engineering</h1>     
      <ul className={classes.paraCategoriesSection}>
        <li>
          Lorem Ipsum
        </li>
        <li>
          Lorem Ipsum
        </li>
        <li>
          Lorem Ipsum
        </li>
        <li>
          Lorem Ipsum
        </li>
      </ul> 
    </div>
    
  </div>
  )
}
