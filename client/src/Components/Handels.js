import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import InstagramIcon from "@material-ui/icons/Instagram";
import GitHubIcon from "@material-ui/icons/GitHub";
import EmailIcon from "@material-ui/icons/Email";

export default function Handles() {
  const classes = useStyles();
  return (
    <div style={{ width: "15%" }}>
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

const useStyles = makeStyles({
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
});
