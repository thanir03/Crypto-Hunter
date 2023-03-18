// prettier-ignore
import React, {useState} from "react";
import SearchBar from "./SearchBar";
import { CoinsListType } from "../../../api/coinListApi";
import CoinsList from "./CoinsList";
// prettier-ignore
import {ThemeProvider,createTheme,Container,makeStyles,} from "@material-ui/core";
import { Pagination } from "@mui/material";

const COINS_PER_PAGE = 5;

const filteredDataAccordingToQuery = (
  data: CoinsListType[],
  searchQuery: string,
  isAscending: boolean
): CoinsListType[] => {
  searchQuery = searchQuery.toLowerCase();
  const newData = data.filter(
    (item) =>
      item.name.toLowerCase().includes(searchQuery) ||
      item.symbol.toLowerCase().includes(searchQuery)
  );
  return isAscending ? newData : newData.reverse();
};

const useStyles = makeStyles(() => ({
  pagination: {
    "& .MuiPaginationItem-root": {
      color: "gold",
    },
  },
}));

const darkTheme = createTheme({
  palette: {
    primary: {
      main: "#fff",
    },
    type: "dark",
  },
});

interface CoinsTableProps {
  data: CoinsListType[];
  loading: boolean;
}

const CoinsTable = (props: CoinsTableProps) => {
  const classes = useStyles();
  const [searchQuery, setSearchQuery] = useState<string>("");
  const [page, setPages] = useState(1);
  const [isAscending, setIsAscending] = useState(true);
  const filteredData = filteredDataAccordingToQuery(
    props.data,
    searchQuery,
    isAscending
  );
  let totalPages = Math.ceil(filteredData.length / COINS_PER_PAGE);
  const coinTableListData = filteredData.slice(
    page * COINS_PER_PAGE - COINS_PER_PAGE,
    page * COINS_PER_PAGE
  );

  // prettier-ignore
  const handleChangeQuery = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(event.target.value);
    setPages(1);
  };
  const handleToggleSort = (event: React.MouseEvent<HTMLButtonElement>) => {
    setIsAscending((isAscending) => !isAscending);
    setPages(1);
  };

  // prettier-ignore
  const handleChangePage = (event: React.ChangeEvent<unknown>,page: number) => {
    setPages(page);
  };

  return (
    <ThemeProvider theme={darkTheme}>
      <Container style={{ textAlign: "center" }}>
        <div style={{ display: "flex", justifyContent: "space-between" }}>
          <h4
            style={{
              textAlign: "center",
              margin: "18px",
              fontWeight: "normal",
              fontSize: "30px",
            }}
          >
            Cryptocurrency Prices by Market Cap
          </h4>
          <button
            style={{
              backgroundColor: "gold",
              padding: "10",
              color: "black",
              borderRadius: 4,
              cursor: "pointer",
              margin: "10",
            }}
            onClick={handleToggleSort}
          >
            Filter by {isAscending ? "Descending" : "Ascending"}
          </button>
        </div>
        <SearchBar query={searchQuery} onChangeQuery={handleChangeQuery} />
        <CoinsList data={coinTableListData} loading={props.loading} />
        <Pagination
          style={{ padding: "20px", display: "flex", justifyContent: "center" }}
          classes={{ ul: classes.pagination }}
          page={page}
          onChange={handleChangePage}
          count={totalPages}
          color="primary"
        />
      </Container>
    </ThemeProvider>
  );
};

export default CoinsTable;
