import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import Tabs from "@material-ui/core/Tabs";
import Tab from "@material-ui/core/Tab";
import { tools } from "../data/constants";
import Navbar from "../layout/Navbar";
import { technique } from "../data/techniques";
import TabPanelDisplay from "../Components/TabPanelDisplay";

function a11yProps(index) {
  return {
    id: `vertical-tab-${index}`,
    "aria-controls": `vertical-tabpanel-${index}`,
  };
}

export default function Tools() {
  const classes = useStyles();
  const [value, setValue] = React.useState(0);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  const renderList = [
    "Cryptography",
    "Web Exploitation",
    "Binary Exploitation",
    "Forensics",
    "Reverse Engineering",
  ];
  return (
    <div>
      <div className={classes.navbar}>
        <Navbar home getStarted tools />
      </div>
      <div className={classes.root}>
        <Tabs
          orientation="vertical"
          variant="scrollable"
          value={value}
          onChange={handleChange}
          aria-label="Vertical tabs example"
          className={classes.tabs}
        >
          {renderList.map((dat, idx) => {
            return (
              <Tab
                className={classes.heading}
                label={dat}
                {...a11yProps(idx)}
              />
            );
          })}
        </Tabs>
        {Object.keys(technique).map((dat, idx) => {
          return (
            <TabPanelDisplay
              type={technique[dat]}
              val={value}
              idx={idx}
              typeName={dat}
            />
          );
        })}
      </div>
    </div>
  );
}

const useStyles = makeStyles((theme) => ({
  navbar: {
    backgroundColor: tools.backgroundPrimary,
    height: "12vh",
  },
  root: {
    backgroundColor: tools.backgroundSecondary,
    display: "flex",
    color: "white",
    justifyContent: "center",
  },
  hr: {
    height: "0.5px",
    borderWidth: "0",
    color: "#363B46",
    backgroundColor: "#363B46",
  },
  tabs: {
    borderRight: `2px solid ${theme.palette.divider}`,
    padding: 10,
    paddingRight: 0,
  },

  heading: {
    fontSize: "1.4rem",
    fontWeight: "bolder",
    fontFamily: "'Roboto', serif",
    color: "gold",
    marginTop: "10%",
  },
}));
