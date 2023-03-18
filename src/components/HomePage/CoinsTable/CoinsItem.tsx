import React, { useContext } from "react";
import { TableCell, TableRow } from "@mui/material";
import { useNavigate } from "react-router-dom";
import { makeStyles } from "@material-ui/core";
import { AppContext } from "../../../store/AppContext";
import { CoinsListType } from "../../../api/coinListApi";

const useStyles = makeStyles(() => ({
  tableRow: {
    "&:hover": {
      backgroundColor: "black",
    },
    cursor: "pointer",
  },
}));
const MILLION = 10 ** 6;
const CoinsItem = (props: { item: CoinsListType }) => {
  const { currency } = useContext(AppContext);
  const navigate = useNavigate();
  const isProfit = props.item.price_change_percentage_24h >= 0;

  const handleNavigateCoin = () => {
    navigate(`/coins/${props.item.id}`);
  };

  const classes = useStyles();

  return (
    <TableRow className={classes.tableRow} onClick={handleNavigateCoin}>
      <TableCell>
        <div style={{ display: "flex", gap: 10 }}>
          <img height={50} src={props.item.image} alt={props.item.name} />
          <div>
            <h2>{props.item.symbol.toUpperCase()}</h2>
            <p style={{ color: "gray" }}>{`${props.item.name}`}</p>
          </div>
        </div>
      </TableCell>
      <TableCell align="right">
        {`${currency} ${props.item?.current_price.toLocaleString("en-US")}`}
      </TableCell>
      <TableCell align="right" style={{ color: isProfit ? "green" : "red" }}>
        {isProfit ? "+" : ""}
        {props.item.price_change_percentage_24h.toLocaleString("en-US")} %
      </TableCell>
      <TableCell align="right">
        ${Math.floor(props.item.market_cap / MILLION)} M
      </TableCell>
    </TableRow>
  );
};

export default CoinsItem;
