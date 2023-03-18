import { Button } from "@mui/material";
import React from "react";
interface CoinChartButtonsProps {
  interval: number;
  onChangeInterval: (data: number) => void;
}

const CoinChartButtons = (props: CoinChartButtonsProps) => {
  const { interval, onChangeInterval } = props;
  return (
    <div
      style={{
        display: "flex",
        justifyContent: "space-around",
        alignItems: "center",
        padding: "30px",
      }}
    >
      <Button
        style={{
          color: interval === 1 ? "black" : "gold",
          backgroundColor: interval === 1 ? "gold" : "black",
          width: "200px",
          borderRadius: "20px",
        }}
        onClick={() => onChangeInterval(1)}
        variant="contained"
      >
        24 Hours
      </Button>
      <Button
        style={{
          color: interval === 30 ? "black" : "gold",
          backgroundColor: interval === 30 ? "gold" : "black",
          width: "200px",
          borderRadius: "20px",
        }}
        onClick={() => onChangeInterval(30)}
        variant="contained"
      >
        30 Days
      </Button>
      <Button
        style={{
          color: interval === 365 ? "black" : "gold",
          backgroundColor: interval === 365 ? "gold" : "black",
          width: "200px",
          borderRadius: "20px",
        }}
        onClick={() => onChangeInterval(365)}
        variant="contained"
      >
        1 Year
      </Button>
    </div>
  );
};

export default CoinChartButtons;
