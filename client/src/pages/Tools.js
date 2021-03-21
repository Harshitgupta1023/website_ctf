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

export default function VerticalTabs() {
  const classes = useStyles();
  const [value, setValue] = React.useState(0);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  return (
    <div>
      <div container component="main" className={classes.navbar}>
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
          <p className={classes.content}>
            <BouncingText text="Cryptography" />
          </p>
          <Grid container component="main">
            <Grid item xs={4} md={4} sm={4}>
              <ToolsCard
                title="HEX TO ASCII"
                description_link="https://youtube.com"
                usage_link="https://youtube.com"
                paddingLeft="10%"
              />
            </Grid>
            <Grid item xs={4}>
              <ToolsCard
                title="HEX TO ASCII"
                description_link="https://youtube.com"
                usage_link="https://youtube.com"
              />
            </Grid>
            <Grid item xs={4}>
              <ToolsCard
                title="HEX TO ASCII"
                description_link="https://youtube.com"
                usage_link="https://youtube.com"
              />
            </Grid>
            <Grid item xs={4}>
              <ToolsCard
                title="HEX TO ASCII"
                description_link="https://youtube.com"
                usage_link="https://youtube.com"
              />
            </Grid>
            <Grid item xs={4}>
              <ToolsCard
                title="HEX TO ASCII"
                description_link="https://youtube.com"
                usage_link="https://youtube.com"
              />
            </Grid>
            <Grid item xs={4}>
              <ToolsCard
                title="HEX TO ASCII"
                description_link="https://youtube.com"
                usage_link="https://youtube.com"
              />
            </Grid>
          </Grid>
        </TabPanel>
        <TabPanel
          value={value}
          index={1}
          style={{
            backgroundImage:
              "linear-gradient(120deg, #1a202c 0%, #334a71 100%)",
          }}
        >
          <p className={classes.content}>
            <BouncingText text="Web Exploitation" />
          </p>
          <Grid container component="main">
            <Grid item xs={4} md={4} sm={4}>
              <ToolsCard
                title="HEX TO ASCII"
                description_link="https://youtube.com"
                usage_link="https://youtube.com"
                paddingLeft="10%"
              />
            </Grid>
            <Grid item xs={4}>
              <ToolsCard
                title="HEX TO ASCII"
                description_link="https://youtube.com"
                usage_link="https://youtube.com"
              />
            </Grid>
            <Grid item xs={4}>
              <ToolsCard
                title="HEX TO ASCII"
                description_link="https://youtube.com"
                usage_link="https://youtube.com"
              />
            </Grid>
            <Grid item xs={4}>
              <ToolsCard
                title="HEX TO ASCII"
                description_link="https://youtube.com"
                usage_link="https://youtube.com"
              />
            </Grid>
            <Grid item xs={4}>
              <ToolsCard
                title="HEX TO ASCII"
                description_link="https://youtube.com"
                usage_link="https://youtube.com"
              />
            </Grid>
            <Grid item xs={4}>
              <ToolsCard
                title="HEX TO ASCII"
                description_link="https://youtube.com"
                usage_link="https://youtube.com"
              />
            </Grid>
          </Grid>
        </TabPanel>
        <TabPanel value={value} index={2}>
          <p className={classes.content}>
            <BouncingText text="Binary Exploitation" />
          </p>

          <Grid container component="main">
            <Grid item xs={4} md={4} sm={4}>
              <ToolsCard
                title="HEX TO ASCII"
                description_link="https://youtube.com"
                usage_link="https://youtube.com"
                paddingLeft="10%"
              />
            </Grid>
            <Grid item xs={4}>
              <ToolsCard
                title="HEX TO ASCII"
                description_link="https://youtube.com"
                usage_link="https://youtube.com"
              />
            </Grid>
            <Grid item xs={4}>
              <ToolsCard
                title="HEX TO ASCII"
                description_link="https://youtube.com"
                usage_link="https://youtube.com"
              />
            </Grid>
            <Grid item xs={4}>
              <ToolsCard
                title="HEX TO ASCII"
                description_link="https://youtube.com"
                usage_link="https://youtube.com"
              />
            </Grid>
            <Grid item xs={4}>
              <ToolsCard
                title="HEX TO ASCII"
                description_link="https://youtube.com"
                usage_link="https://youtube.com"
              />
            </Grid>
            <Grid item xs={4}>
              <ToolsCard
                title="HEX TO ASCII"
                description_link="https://youtube.com"
                usage_link="https://youtube.com"
              />
            </Grid>
          </Grid>
        </TabPanel>
        <TabPanel value={value} index={3}>
          <p className={classes.content}>
            <BouncingText text="Forensics" />
          </p>
          <Grid container component="main">
            <Grid item xs={4} md={4} sm={4}>
              <ToolsCard
                title="HEX TO ASCII"
                description_link="https://youtube.com"
                usage_link="https://youtube.com"
                paddingLeft="10%"
              />
            </Grid>
            <Grid item xs={4}>
              <ToolsCard
                title="HEX TO ASCII"
                description_link="https://youtube.com"
                usage_link="https://youtube.com"
              />
            </Grid>
            <Grid item xs={4}>
              <ToolsCard
                title="HEX TO ASCII"
                description_link="https://youtube.com"
                usage_link="https://youtube.com"
              />
            </Grid>
            <Grid item xs={4}>
              <ToolsCard
                title="HEX TO ASCII"
                description_link="https://youtube.com"
                usage_link="https://youtube.com"
              />
            </Grid>
            <Grid item xs={4}>
              <ToolsCard
                title="HEX TO ASCII"
                description_link="https://youtube.com"
                usage_link="https://youtube.com"
              />
            </Grid>
            <Grid item xs={4}>
              <ToolsCard
                title="HEX TO ASCII"
                description_link="https://youtube.com"
                usage_link="https://youtube.com"
              />
            </Grid>
          </Grid>
        </TabPanel>
        <TabPanel value={value} index={4}>
          <p className={classes.content}>
            <BouncingText text="Reverse Engineering" />
          </p>
          <Grid container component="main">
            <Grid item xs={4} md={4} sm={4}>
              <ToolsCard
                title="HEX TO ASCII"
                description_link="https://youtube.com"
                usage_link="https://youtube.com"
                paddingLeft="10%"
              />
            </Grid>
            <Grid item xs={4}>
              <ToolsCard
                title="HEX TO ASCII"
                description_link="https://youtube.com"
                usage_link="https://youtube.com"
              />
            </Grid>
            <Grid item xs={4}>
              <ToolsCard
                title="HEX TO ASCII"
                description_link="https://youtube.com"
                usage_link="https://youtube.com"
              />
            </Grid>
            <Grid item xs={4}>
              <ToolsCard
                title="HEX TO ASCII"
                description_link="https://youtube.com"
                usage_link="https://youtube.com"
              />
            </Grid>
            <Grid item xs={4}>
              <ToolsCard
                title="HEX TO ASCII"
                description_link="https://youtube.com"
                usage_link="https://youtube.com"
              />
            </Grid>
            <Grid item xs={4}>
              <ToolsCard
                title="HEX TO ASCII"
                description_link="https://youtube.com"
                usage_link="https://youtube.com"
              />
            </Grid>
          </Grid>
        </TabPanel>
      </div>
    </div>
  );
}
