import React from "react";
import CoinsItem from "./CoinsItem";
import {
  Table,
  TableBody,
  TableContainer,
  LinearProgress,
} from "@material-ui/core";
import TableHeader from "./TableHeader";
import { CoinsListType } from "../../../api/coinListApi";

const CoinsList = (props: { data: CoinsListType[]; loading: boolean }) => {
  return (
    <>
      <TableContainer>
        {props.loading && (
          <LinearProgress style={{ width: "100%" }} color="primary" />
        )}
        <Table>
          <TableHeader />
          <TableBody>
            {props.data.map((item) => (
              <CoinsItem key={item.id} item={item} />
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </>
  );
};

export default CoinsList;
