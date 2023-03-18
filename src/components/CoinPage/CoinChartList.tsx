import React, { useContext } from "react";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";
import { Line } from "react-chartjs-2";
import { AppContext } from "../../store/AppContext";

interface CoinCharListProps {
  coinMarketData: Array<[number, number]>;
  interval: number;
}

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Tooltip,
  Title,
  Legend
);

const options = {
  responsive: true,
};
const CoinChartList = (props: CoinCharListProps) => {
  const { currency } = useContext(AppContext);
  const chartXAxisLabel = props.coinMarketData.map((item) => {
    if (props.interval === 1)
      return new Date(item[0]).toLocaleTimeString("en-US");
    return new Date(item[0]).toLocaleDateString("en-US");
  });
  const data = {
    labels: chartXAxisLabel,
    datasets: [
      {
        label: ` Prices in ${currency}`,
        data: props.coinMarketData.map((item) => item[1]),
        borderColor: "gold",
      },
    ],
  };
  return <Line options={options} data={data} />;
};

export default CoinChartList;
