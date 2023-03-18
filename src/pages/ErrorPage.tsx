import React from "react";
import { makeStyles } from "@material-ui/core";
import { Link } from "react-router-dom";

const useStyles = makeStyles(() => ({
  welcomBtn: {
    display: "block",
    backgroundColor: "gold",
    color: "black",
    fontWeight: "bold",
    padding: "10px",
    borderRadius: "4px",
  },
}));

const ErrorPage = () => {
  const classes = useStyles();
  return (
    <div
      style={{
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        flexDirection: "column",
        gap: 30,
        height: "94vh",
        backgroundColor: "black",
      }}
    >
      <h3>Are you lost ? </h3>
      <Link className={classes.welcomBtn} to="/">
        Head to Crypto Hunter
      </Link>
    </div>
  );
};

export default ErrorPage;
