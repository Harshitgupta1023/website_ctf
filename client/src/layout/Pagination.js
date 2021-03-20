import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import Pagination from "@material-ui/lab/Pagination";
import Grid from "@material-ui/core/Grid";
import { Typography } from "@material-ui/core";
const useStyles = makeStyles((theme) => ({
  root: {
    width: "100%",
    flexGrow: 1,
  },
  paper: {
    padding: theme.spacing(2),
    textAlign: "center",
    color: theme.palette.text.secondary,
  },
}));
export default function BasicPagination({
  postsPerPage,
  totalPosts,
  paginate,
  points,
  solved,
}) {
  const classes = useStyles();
  const i = Math.ceil(totalPosts / postsPerPage);
  return (
    <div className={classes.root}>
      <Grid container>
        <Grid item xs={8} sm={8}>
          <Pagination
            style={{ position: "relative", marginLeft: 650 }}
            count={i}
            size="large"
            color="secondary"
            onChange={(event, page) => paginate(page)}
          />
        </Grid>
        <Grid item xs={4} sm={2}>
          <Typography
            variant="h4"
            color="primary"
            style={{
              position: "relative",
              marginLeft: 40,
              fontSize: "2.25rem",
              color: "gold",
              fontWeight: "bolder",
              fontFamily: "'Roboto', sans-serif",
            }}
          >
            Points: {points}
          </Typography>
        </Grid>
        <Grid item xs={4} sm={2}>
          <Typography
            variant="h4"
            color="primary"
            style={{
              position: "relative",
              marginLeft: 40,
              fontSize: "2.25rem",
              color: "gold",
              fontWeight: "bolder",
              fontFamily: "'Roboto', sans-serif",
            }}
          >
            Solved: {solved}
          </Typography>
        </Grid>
      </Grid>
    </div>
  );
}
