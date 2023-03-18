import { Typography, makeStyles } from "@material-ui/core";
import React from "react";

const useStyles = makeStyles(() => ({
  tagline: {
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    textAlign: "center",
  },
}));

function BannerHeading() {
  const classes = useStyles();
  return (
    <div className={classes.tagline}>
      <Typography
        variant="h2"
        style={{
          marginBottom: 15,
          fontWeight: "bolder",
          fontFamily: "Montserrat",
        }}
      >
        Crypto Hunter
      </Typography>
      <Typography
        style={{
          fontFamily: "Montserrat",
          color: "gray",
        }}
      >
        Get All The Info Regarding Your Favorite Crypto Currency
      </Typography>
    </div>
  );
}

export default React.memo(BannerHeading);
