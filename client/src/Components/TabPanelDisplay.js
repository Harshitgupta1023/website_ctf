import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import { Grid } from "@material-ui/core";
import Typography from "@material-ui/core/Typography";
import Box from "@material-ui/core/Box";
import PropTypes from "prop-types";

import ToolsCard from "./ToolsCard";
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
        <Box>
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

const TabPanelDisplay = ({ type, val, typeName, idx }) => {
  const classes = useStyles();

  return (
    <TabPanel value={val} index={idx} className={classes.tabPanelContainer}>
      <div className={classes.content}>
        <BouncingText text={typeName} />
      </div>
      <Grid container>
        {type.map((data, index) => (
          <Grid item key={index} xs={3}>
            <ToolsCard
              title={data.title}
              description_link={data.description_link}
              usage_link={data.usage_link}
            />
          </Grid>
        ))}
      </Grid>
    </TabPanel>
  );
};

const useStyles = makeStyles({
  content: {
    fontFamily: "'Roboto', cursive",
    margin: "3% 0% 0% 3%",
    fontSize: "4rem",
  },

  tabPanelContainer: {
    background:
      "linear-gradient(to bottom, #112a5d 0%, rgba(0,0,0,0.15) 100%), radial-gradient(at top center, rgba(255,255,255,0.40) 0%, #2d3748 120%) #989898",
    backgroundBlendMode: "multiply,multiply",
    width: "100%",
    minHeight: "90vh",
  },
});

export default TabPanelDisplay;
