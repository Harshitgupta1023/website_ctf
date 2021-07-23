import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import Paper from "@material-ui/core/Paper";
import Typography from "@material-ui/core/Typography";
import LinkedInIcon from "@material-ui/icons/LinkedIn";
import GitHubIcon from "@material-ui/icons/GitHub";
import EmailIcon from "@material-ui/icons/Email";

const useStyles = makeStyles({
  mainContainer: {
    padding: "4% 3% 0%",
    display: "flex",
    width: "100%",
    flexDirection: "row",
    justifyContent: "space-evenly",
    alignItems: "center",
  },
  text: {
    fontFamily: "'Playfair Display', serif",
    fontWeight: "bolder",
    fontSize: "4rem",
    color: "gold",
  },
  cardContainer: {
    border: "1px solid white",
    padding: 20,
    width: "20%",
    marginRight: 10,
  },
  nameContainer: {
    textAlign: "center",
    paddingBottom: 10,
  },
  handleContainer: {
    display: "flex",
    width: "100%",
    justifyContent: "space-around",
  },
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

const List = [
  {
    name: "Harshit Gupta",
    linkedin: "https://www.linkedin.com/in/harshit-gupta-65929118b/",
    github: "https://github.com/Harshitgupta1023",
    mail: "gupta.44@iitj.ac.in",
  },
  {
    name: "Sarthak Vasan",
    linkedin: "https://www.linkedin.com/in/sarthak-vasan-ab42551a6/",
    github: "https://github.com/sarthak750",
    mail: "vasan.1@iitj.ac.in",
  },
  {
    name: "Harish Kumar",
    linkedin: "https://www.linkedin.com/in/harish-kumar-919900194/",
    github: "https://github.com/harishk2169",
    mail: "kumar.152@iitj.ac.in",
  },
  {
    name: "Gourav Kumar",
    linkedin: "https://www.linkedin.com/in/gourav2001k",
    github: "https://github.com/gourav2001k",
    mail: "kumar.151@iitj.ac.in",
  },
];
export default function TeamCard() {
  const classes = useStyles();

  return (
    <Paper style={{ width: "100%", height: 500, backgroundColor: "#1A202C" }}>
      <div style={{ marginTop: "5%", textAlign: "center" }}>
        <p className={classes.text}>Our Team</p>
      </div>
      <div className={classes.mainContainer}>
        {List.map((dat, idx) => {
          return (
            <div className={classes.cardContainer} key={idx}>
              <div className={classes.nameContainer}>
                <Typography gutterBottom variant="h5" component="h2">
                  {dat.name}
                </Typography>
                <Typography variant="h6" color="textSecondary" component="h6">
                  Junior | core-member
                </Typography>
              </div>
              {/* <div className={classes.descriptionContainer}>
                <Typography variant="body2" component="p">
                  {dat.description}
                </Typography>
              </div> */}
              <div className={classes.handleContainer}>
                <a
                  className={classes.handlesLinks}
                  href={dat.linkedin}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <LinkedInIcon className={classes.handlesIcons} />
                </a>
                <a
                  className={classes.handlesLinks}
                  href={dat.github}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <GitHubIcon className={classes.handlesIcons} />
                </a>

                <a
                  className={classes.handlesLinks}
                  href={`mailto: ${dat.mail}`}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <EmailIcon className={classes.handlesIcons} />
                </a>
              </div>
            </div>
          );
        })}
      </div>
    </Paper>
  );
}
