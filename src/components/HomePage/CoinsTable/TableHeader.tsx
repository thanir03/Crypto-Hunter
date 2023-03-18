import { TableCell, TableHead, TableRow } from "@material-ui/core";
import { makeStyles } from "@material-ui/core";

const useStyle = makeStyles(() => ({
  tableHead: {
    backgroundColor: "gold",
    fontWeight: "bold",
    borderRadius: "4px",
  },
  tableCell: {
    color: "black",
  },
}));

function TableHeader() {
  const classes = useStyle();
  return (
    <TableHead className={classes.tableHead}>
      <TableRow>
        <TableCell className={classes.tableCell}>Coin</TableCell>
        <TableCell align="right" className={classes.tableCell}>
          Price
        </TableCell>
        <TableCell align="right" className={classes.tableCell}>
          24h Change
        </TableCell>
        <TableCell align="right" className={classes.tableCell}>
          Market Cap
        </TableCell>
      </TableRow>
    </TableHead>
  );
}

export default TableHeader;
