import React, { useMemo } from "react";
import { makeStyles } from "@material-ui/core";
import CarousalItem from "./CarousalItem";
import AliceCarousel from "react-alice-carousel";
import { CoinsListType } from "../../../api/coinListApi";

const useStyles = makeStyles((theme) => ({
  caurousel: {
    height: "50%",
    display: "flex",
    alignItems: "center",
    textAlign: "center",
  },
}));

interface CarousalProps {
  loading: boolean;
  data: CoinsListType[];
}

const Carousal = (props: CarousalProps) => {
  const classes = useStyles();

  const coinList = useMemo(
    () =>
      props.data.map((item) => {
        return <CarousalItem key={item.id} data={item} />;
      }),
    [props.data]
  );

  return (
    <div className={classes.caurousel}>
      {props.loading && <p>Loading...</p>}
      {props.data.length > 0 && !props.loading && (
        <AliceCarousel
          autoPlay
          disableDotsControls
          infinite
          items={coinList}
          animationDuration={1000}
          responsive={{
            0: { items: 2 },
            512: { items: 4 },
          }}
        />
      )}
    </div>
  );
};

export default Carousal;
