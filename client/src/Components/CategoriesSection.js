import React from "react";
import { makeStyles } from "@material-ui/core/styles";

import { homeCategoryDetails } from "../data/constants";

export default function CategoriesSection() {
  const classes = useStyles();
  return (
    <div>
      <p className={classes.categoryText}>Categories</p>
      <hr className={classes.categoryDetailContainer} />
      {homeCategoryDetails.map((dat) => {
        return (
          <div
            xs={12}
            sm={8}
            md={5}
            className={classes.categoriesRow}
            key={dat.id}
          >
            <img
              src={dat.image}
              className={
                dat.id % 2 === 1
                  ? classes.imageLayoutLeft
                  : classes.imageLayoutRight
              }
              alt={dat.title}
            ></img>
            <h1 className={classes.headingCategoriesSection}>{dat.title}</h1>
            <p className={classes.paraCategoriesSection}>{dat.description}</p>
          </div>
        );
      })}
    </div>
  );
}

const useStyles = makeStyles({
  categoryText: {
    margin: "3% 40% 0%",
    fontSize: "3.5rem",
    color: "white",
    fontWeight: "bolder",
  },
  categoryDetailContainer: {
    marginTop: "2%",
    marginLeft: "47.5%",
    borderStyle: "dotted none none",
    width: "5%",
    borderWidth: "10px",
    borderColor: "grey",
  },
  categoriesRow: {
    width: "80%",
    margin: "5% auto 12% auto",
    textAlign: "left",
    lineHeight: "1",
  },

  imageLayoutLeft: {
    width: "35%",
    height: "35%",
    borderRadius: "20%",
    float: "left",
    marginRight: "30px",
    padding: "3px",
    background: "linear-gradient(to right, gold, green)",
  },

  imageLayoutRight: {
    width: "35%",
    height: "35%",
    borderRadius: "20%",
    float: "right",
    marginLeft: "30px",
    padding: "3px",
    background: "linear-gradient(to right, gold,green)",
  },
  headingCategoriesSection: {
    color: "gold",
    marginBottom: "3%",
    fontSize: "2.5rem",
    fontFamily: "'Roboto', serif",
  },

  paraCategoriesSection: {
    color: "white",
    fontSize: "1rem",
    lineHeight: "1.2",
  },
});
