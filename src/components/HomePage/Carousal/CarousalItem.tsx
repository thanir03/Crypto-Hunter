import React,{useContext} from "react";
import { Link } from "react-router-dom";
import { AppContext } from "../../../store/AppContext";
import { CoinsListType } from "../../../api/coinListApi";

interface CarousalItemProps {
  data: CoinsListType;
}

const CarousalItem = (props: CarousalItemProps) => {
  const { currency } = useContext(AppContext)
  const { data } = props;
  const isProfit = data.price_change_24h >= 0;
  return (
    <>
      <Link to={`/coins/${data.id}`}>
        <img height={75} src={data.image} alt={data.name} style={{ marginBottom: 10 }}
        />
        <p style={{ color: "white" }}>
          <span>{data.symbol.toUpperCase()}</span>
          <span style={{color: isProfit ? "green" : "red"}}>{
          `${isProfit ? "+" : ""}${data.price_change_percentage_24h.toFixed(2)} %`}</span>
        </p>
        <h4 style={{ color: "white" }}>
          {`${currency} ${data.current_price.toLocaleString("en-MY")}`}
        </h4>
      </Link>
    </>
  );
};

export default CarousalItem;
