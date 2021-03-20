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
    height: "10vh",
  },
  root: {
    flexGrow: 1,
    backgroundColor: tools.backgroundSecondary,
    display: "flex",
    height: "90vh",
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
    width: "40vh",
  },

  heading: {
    fontSize: "1.7rem",
    fontWeight: "bolder",
    margin: "8%",
    color: "gold",
  },

  content: {
    margin: "3%",
    fontWeight: "bolder",
    fontSize: "3rem",
    width: "100%",
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
        <Navbar home getStarted />
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

        <TabPanel value={value} index={0}>
          <p className={classes.content}>
            <BouncingText text="Cryptography" />

            <div
              style={{
                display: "flex",
                justifyContent: "center",
                padding: 10,
              }}
            >
              <ToolsCard />
              <ToolsCard />
              <ToolsCard />
              <ToolsCard />
            </div>
          </p>
        </TabPanel>
        <TabPanel value={value} index={1}>
          <p className={classes.content}>
            <BouncingText text="Web Exploitation" />
          </p>
        </TabPanel>
        <TabPanel value={value} index={2}>
          <p className={classes.content}>
            <BouncingText text="Binanry Exploitation" />
          </p>
        </TabPanel>
        <TabPanel value={value} index={3}>
          <p className={classes.content}>
            <BouncingText text="Forensics" />
          </p>
        </TabPanel>
        <TabPanel value={value} index={4}>
          <p className={classes.content}>
            <BouncingText text="Reverse Engineering" />
          </p>
        </TabPanel>
      </div>
    </div>
  );
}
