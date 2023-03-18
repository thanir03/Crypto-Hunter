import { CircularProgress } from "@mui/material";
import React from "react";
import { makeStyles } from "@material-ui/core";

const useStyles = makeStyles(() => ({
  loadingPage: {
    height: "100vh",
    width: "100vw",
    backgroundColor: "black",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  },
}));
const LoadingScreen = () => {
  const classes = useStyles();
  return (
    <div className={classes.loadingPage}>
      <CircularProgress size={100} />
    </div>
  );
};

export default LoadingScreen;
