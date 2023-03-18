import React from "react";
import CoinChartList from "./CoinChartList";
import CoinChartButtons from "./CoinChartButtons";
import { AxiosError } from "axios";

interface coinChartProps {
  data: Array<[number, number]>;
  error: AxiosError | null;
  interval: number;
  onChangeInterval: (interval: number) => void;
}

const CoinChart = (props: coinChartProps) => {
  return (
    <div className="coin-graph">
      {props.data && (
        <CoinChartList coinMarketData={props.data} interval={props.interval} />
      )}
      <CoinChartButtons
        interval={props.interval}
        onChangeInterval={props.onChangeInterval}
      />
    </div>
  );
};

export default CoinChart;

// Coin Market interval
// 24 hours
// 30 days
// 3 months
// 1 year
