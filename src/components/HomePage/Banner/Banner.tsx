import React from "react";
import { Container, makeStyles } from "@material-ui/core";
import Carousal from "../Carousal/Carousal";
import BannerHeading from "./BannerHeading";
import { CoinsListType } from "../../../api/coinListApi";

const useStyles = makeStyles(() => ({
  banner: {
    backgroundImage: "url(./banner2.jpg)",
  },
  container: {
    height: 400,
    display: "flex",
    flexDirection: "column",
    paddingTop: 25,
    justifyContent: "space-around",
  },
}));

interface BannerProps {
  data: CoinsListType[];
  loading: boolean;
}

const Banner = (props: BannerProps) => {
  const classes = useStyles();

  return (
    <div className={classes.banner}>
      <Container className={classes.container}>
        <BannerHeading />
        <Carousal data={props.data} loading={props.loading} />
      </Container>
    </div>
  );
};

export default Banner;
