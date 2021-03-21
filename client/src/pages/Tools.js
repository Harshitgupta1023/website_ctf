import React from "react";
import PropTypes from "prop-types";
import { makeStyles } from "@material-ui/core/styles";
import Tabs from "@material-ui/core/Tabs";
import Tab from "@material-ui/core/Tab";
import Typography from "@material-ui/core/Typography";
import Box from "@material-ui/core/Box";
import { tools } from "../data/constants";
import Navbar from "../layout/Navbar";
import ToolsCard from "../Components/ToolsCard";
import BouncingText from "../animation/BouncingText";
import { Grid } from "@material-ui/core";
import { technique } from "../data/techniques";
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
    "aria-controls": `vertical-tabpanel-${index}`,
  };
}

const useStyles = makeStyles((theme) => ({
  navbar: {
    backgroundColor: tools.backgroundPrimary,
    height: "12vh",
  },
  root: {
    flexGrow: 1,
    backgroundColor: tools.backgroundSecondary,
    display: "flex",

    color: "white",
  },
  hr: {
    height: "0.5px",
    borderWidth: "0",
    color: "#363B46",
    backgroundColor: "#363B46",
  },
  tabs: {
    borderRight: `2px solid ${theme.palette.divider}`,
    width: "25%",
  },

  heading: {
    fontSize: "1.7rem",
    fontWeight: "bolder",
    fontFamily: "'Cormorant Unicase', serif",
    padding: "0% 8%",
    color: "gold",
    marginTop: "10%",
    marginLeft: "4%",
  },

  content: {
    fontFamily: "'Dancing Script', cursive",
    margin: "3%",
    // fontWeight: "bolder",
    fontSize: "4rem",
    width: "60%",
  },
}));

export default function Tools() {
  const {
    cryptography_technique,
    web_technique,
    binary_technique,
    forensics_technique,
    reverse_technique,
  } = technique;
  const classes = useStyles();
  const [value, setValue] = React.useState(0);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  return (
    <div>
      <div component="main" className={classes.navbar}>
        <Navbar home getStarted tools />
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
          <Tab
            className={classes.heading}
            label="Cryptography"
            {...a11yProps(0)}
          />
          <Tab
            className={classes.heading}
            label="Web Exploitation"
            {...a11yProps(1)}
          />
          <Tab
            className={classes.heading}
            label="Binary Exploitation"
            {...a11yProps(2)}
          />
          <Tab
            className={classes.heading}
            label="Forensics"
            {...a11yProps(3)}
          />
          <Tab
            className={classes.heading}
            label="Reverse Engineering"
            {...a11yProps(4)}
          />
        </Tabs>

        <TabPanel
          value={value}
          index={0}
          style={{
            background:
              "linear-gradient(to bottom, #112a5d 0%, rgba(0,0,0,0.15) 100%), radial-gradient(at top center, rgba(255,255,255,0.40) 0%, #2d3748 120%) #989898",
            backgroundBlendMode: "multiply,multiply",
          }}
        >
          <div className={classes.content}>
            <BouncingText text="Cryptography" />
          </div>
          <Grid container component="main">
            {cryptography_technique.map((data, index) => (
              <Grid item xs={4} md={4} sm={4} key={index}>
                <ToolsCard
                  title={data.title}
                  description_link={data.description_link}
                  usage_link={data.usage_link}
                  paddingLeft="10%"
                />
              </Grid>
            ))}
          </Grid>
        </TabPanel>
        <TabPanel
          value={value}
          index={1}
          style={{
            background:
              "linear-gradient(to bottom, #112a5d 0%, rgba(0,0,0,0.15) 100%), radial-gradient(at top center, rgba(255,255,255,0.40) 0%, #2d3748 120%) #989898",
            backgroundBlendMode: "multiply,multiply",
          }}
        >
          <div className={classes.content}>
            <BouncingText text="Web Exploitation" />
          </div>
          <Grid container component="main">
            {web_technique.map((data, index) => (
              <Grid item xs={4} md={4} sm={4} key={index}>
                <ToolsCard
                  title={data.title}
                  description_link={data.description_link}
                  usage_link={data.usage_link}
                  paddingLeft="10%"
                />
              </Grid>
            ))}
          </Grid>
        </TabPanel>
        <TabPanel
          value={value}
          index={2}
          style={{
            background:
              "linear-gradient(to bottom, #112a5d 0%, rgba(0,0,0,0.15) 100%), radial-gradient(at top center, rgba(255,255,255,0.40) 0%, #2d3748 120%) #989898",
            backgroundBlendMode: "multiply,multiply",
          }}
        >
          <div className={classes.content}>
            <BouncingText text="Binary Exploitation" />
          </div>
          <Grid container component="main">
            {binary_technique.map((data, index) => (
              <Grid item xs={4} md={4} sm={4} key={index}>
                <ToolsCard
                  title={data.title}
                  description_link={data.description_link}
                  usage_link={data.usage_link}
                  paddingLeft="10%"
                />
              </Grid>
            ))}
          </Grid>
        </TabPanel>
        <TabPanel
          value={value}
          index={3}
          style={{
            background:
              "linear-gradient(to bottom, #112a5d 0%, rgba(0,0,0,0.15) 100%), radial-gradient(at top center, rgba(255,255,255,0.40) 0%, #2d3748 120%) #989898",
            backgroundBlendMode: "multiply,multiply",
          }}
        >
          <div className={classes.content}>
            <BouncingText text="Forensics" />
          </div>
          <Grid container component="main">
            {forensics_technique.map((data, index) => (
              <Grid item xs={4} md={4} sm={4} key={index}>
                <ToolsCard
                  title={data.title}
                  description_link={data.description_link}
                  usage_link={data.usage_link}
                  paddingLeft="10%"
                />
              </Grid>
            ))}
          </Grid>
        </TabPanel>
        <TabPanel
          value={value}
          index={4}
          style={{
            background:
              "linear-gradient(to bottom, #112a5d 0%, rgba(0,0,0,0.15) 100%), radial-gradient(at top center, rgba(255,255,255,0.40) 0%, #2d3748 120%) #989898",
            backgroundBlendMode: "multiply,multiply",
          }}
        >
          <div className={classes.content}>
            <BouncingText text="Reverse Engineering" />
          </div>
          <Grid container component="main">
            {reverse_technique.map((data, index) => (
              <Grid item xs={4} md={4} sm={4} key={index}>
                <ToolsCard
                  title={data.title}
                  description_link={data.description_link}
                  usage_link={data.usage_link}
                  paddingLeft="10%"
                />
              </Grid>
            ))}
          </Grid>
        </TabPanel>
      </div>
    </div>
  );
}
