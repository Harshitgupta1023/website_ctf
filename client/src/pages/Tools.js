// import React from "react";
// import "../App.css";
// import Navbar from '../layout/Navbar';
// import Avatar from "@material-ui/core/Avatar";
// import Button from "@material-ui/core/Button";
// import CssBaseline from "@material-ui/core/CssBaseline";
// import TextField from "@material-ui/core/TextField";
// import Paper from "@material-ui/core/Paper";
// import Box from "@material-ui/core/Box";
// import Grid from "@material-ui/core/Grid";
// import Typography from "@material-ui/core/Typography";
// import { makeStyles } from "@material-ui/core/styles";
// import {tools} from "../data/constants";
// import { HashLink as Link } from 'react-router-hash-link';

// const useStyles = makeStyles((theme) => ({
//   navbar:{
//     backgroundColor: tools.backgroundPrimary,
//     height: "10vh"
//   },

//   hr:{
//     height:"0.5px",
//     borderWidth:"0",
//     color:"#363B46",
//     backgroundColor:"#363B46"
//   },
  
//   mainSection:{
//     height: "110vh",
//     backgroundColor: tools.backgroundPrimary,
//   },

//   cyptographySection:{
//     height: "70vh",
//     backgroundColor: tools.backgroundSecondary
//   },

//   webExploitationSection:{
//     height: "70vh",
//     backgroundColor:  tools.backgroundPrimary
//   },

//   binaryExploitationSection:{
//     height: "70vh",
//     backgroundColor: tools.backgroundSecondary
//   },

//   forensicsSection:{
//     height: "70vh",
//     backgroundColor: tools.backgroundPrimary
//   },


//   reverseEngineeringSection:{
//     height: "70vh",
//     backgroundColor: tools.backgroundSecondary
//   },

//   headingCategoriesSection:{
//     color: "gold",
//     marginBottom: "3%",
//     fontSize: "2.5rem",
//     marginLeft: "10%",
//     display: "block"
//   },

//   paraCategoriesSection:{
//     color: "white",
//     fontSize: "1.5rem",
//     lineHeight: "1.5",
//     marginLeft: "10%"
//   },

// }));



// export default function Tools() {
//   const classes = useStyles();
//   return (
//     <div>
//     <div container component="main" className= {classes.navbar}>
    
//       <Navbar home getStarted/>
//       {/* <TopicsSection /> */}
  
//     </div>
//     <hr className={classes.hr}></hr>
 
//     <div xs={12} sm={8} md={5} container component="main" className={classes.mainSection}> 
//       <p style={{
//               margin: "0 40% 4%",
//               fontSize: "3.5rem",
//               color: "white",
//               fontWeight: "bolder"
//             }}>Categories</p>

          
//           <Link to="tools#section-one" className={classes.headingCategoriesSection}>Cryptography</Link>
//           <Link to="tools#section-two" className={classes.headingCategoriesSection}>Web Exploitation</Link>
//           <Link to="tools#section-three" className={classes.headingCategoriesSection}>Binary Exploitation</Link>
//           <Link to="tools#section-four" className={classes.headingCategoriesSection}>Forensics</Link>
//           <Link to="tools#section-five" className={classes.headingCategoriesSection}>Reverse Engineering</Link>

      

//     </div>
//     <div xs={12} sm={8} md={5} container component="main" className={classes.cyptographySection} id="section-one"> 
//       <h1 className={classes.headingCategoriesSection}>Cryptography</h1>
//       <ul className={classes.paraCategoriesSection}>
//         <li>
//           Lorem Ipsum
//         </li>
//         <li>
//           Lorem Ipsum
//         </li>
//         <li>
//           Lorem Ipsum
//         </li>
//         <li>
//           Lorem Ipsum
//         </li>
//       </ul> 
//     </div>
//     <div xs={12} sm={8} md={5} container component="main" className={classes.webExploitationSection} id="section-two"> 
//       <h1 className={classes.headingCategoriesSection}>Web Exploitation</h1>
//       <ul className={classes.paraCategoriesSection}>
//         <li>
//           Lorem Ipsum
//         </li>
//         <li>
//           Lorem Ipsum
//         </li>
//         <li>
//           Lorem Ipsum
//         </li>
//         <li>
//           Lorem Ipsum
//         </li>
//       </ul> 
//     </div>
//     <div xs={12} sm={8} md={5} container component="main" className={classes.binaryExploitationSection} id="section-three"> 
//       <h1 className={classes.headingCategoriesSection}>Binary Exploitation</h1> 
//       <ul className={classes.paraCategoriesSection}>
//         <li>
//           Lorem Ipsum
//         </li>
//         <li>
//           Lorem Ipsum
//         </li>
//         <li>
//           Lorem Ipsum
//         </li>
//         <li>
//           Lorem Ipsum
//         </li>
//       </ul>       
//     </div>
//     <div xs={12} sm={8} md={5} container component="main" className={classes.forensicsSection} id="section-four"> 
//       <h1 className={classes.headingCategoriesSection}>Forensics</h1>     
//       <ul className={classes.paraCategoriesSection}>
//         <li>
//           Lorem Ipsum
//         </li>
//         <li>
//           Lorem Ipsum
//         </li>
//         <li>
//           Lorem Ipsum
//         </li>
//         <li>
//           Lorem Ipsum
//         </li>
//       </ul> 
//     </div>
//     <div xs={12} sm={8} md={5} container component="main" className={classes.reverseEngineeringSection} id="section-five"> 
//       <h1 className={classes.headingCategoriesSection}>Reverse Engineering</h1>     
//       <ul className={classes.paraCategoriesSection}>
//         <li>
//           Lorem Ipsum
//         </li>
//         <li>
//           Lorem Ipsum
//         </li>
//         <li>
//           Lorem Ipsum
//         </li>
//         <li>
//           Lorem Ipsum
//         </li>
//       </ul> 
//     </div>
    
//   </div>
//   )
// }


import React from 'react';
import PropTypes from 'prop-types';
import { makeStyles } from '@material-ui/core/styles';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import Typography from '@material-ui/core/Typography';
import Box from '@material-ui/core/Box';
import {tools} from '../data/constants';
import Navbar from '../layout/Navbar';



function TabPanel(props) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`vertical-tabpanel-${index}`}
      aria-labelledby={`vertical-tab-${index}`}
      {...other}
    >
      {value === index && (
        <Box p={3}>
          <Typography>{children}</Typography>
        </Box>
      )}
    </div>
  );
}

TabPanel.propTypes = {
  children: PropTypes.node,
  index: PropTypes.any.isRequired,
  value: PropTypes.any.isRequired,
};

function a11yProps(index) {
  return {
    id: `vertical-tab-${index}`,
    'aria-controls': `vertical-tabpanel-${index}`,
  };
}

const useStyles = makeStyles((theme) => ({
  navbar:{
      backgroundColor: tools.backgroundPrimary,
      height: "10vh"
      },
  root: {
    flexGrow: 1,
    backgroundColor: tools.backgroundSecondary,
    display: 'flex',
    height: "90vh",
    color: "white",

  },
  hr:{
        height:"0.5px",
        borderWidth:"0",
        color:"#363B46",
        backgroundColor:"#363B46"
      },
  tabs: {
    borderRight: `2px solid ${theme.palette.divider}`,
    width: "40vh",
  },

  heading:{
    fontSize: "1.7rem",
    fontWeight: "bolder",
    margin: "8%",
    color: "gold"

  },

  content:{
    margin: "3%",
    fontWeight: "bolder",
    fontSize: "3rem",
    width: "100%"
  }
}));




export default function VerticalTabs() {
  const classes = useStyles();
  const [value, setValue] = React.useState(0);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };


  return (

    <div>
      <div container component="main" className= {classes.navbar}>
        <Navbar home getStarted/>
      </div>
      <hr className={classes.hr}></hr>
    <div className={classes.root}>
      <Tabs
        orientation="vertical"
        variant="scrollable"
        value={value}
        onChange={handleChange}
        aria-label="Vertical tabs example"
        className={classes.tabs}
      >
        <Tab className={classes.heading} label="Cryptography" {...a11yProps(0)} />
        <Tab className={classes.heading} label="Web Exploitation" {...a11yProps(1)} />
        <Tab className={classes.heading} label="Binary Exploitation" {...a11yProps(2)} />
        <Tab className={classes.heading} label="Forensics" {...a11yProps(3)} />
        <Tab className={classes.heading} label="Reverse Engineering" {...a11yProps(4)} />
      </Tabs>
      <TabPanel  value={value} index={0}>
        <p className={classes.content} >Cryptography</p>
      </TabPanel>
      <TabPanel  value={value} index={1}>
        <p className={classes.content}>Web Exploitation</p>
      </TabPanel>
      <TabPanel value={value} index={2}>
        <p className={classes.content} >Bianry Exploitation</p>
      </TabPanel>
      <TabPanel  value={value} index={3}>
        <p className={classes.content} >Forensics</p>
      </TabPanel>
      <TabPanel value={value} index={4}>
        <p className={classes.content} >Reverse Engineering</p> 
        
      </TabPanel>
    </div>
    </div>
  );
}