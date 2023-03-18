import React from "react";
import { Box, makeStyles, TextField } from "@material-ui/core";

interface SearchBarProps {
  query: string;
  onChangeQuery: (event: React.ChangeEvent<HTMLInputElement>) => void;
}

const useStyles = makeStyles(() => ({
  inputField: {
    border: "2px solid white",
    borderRadius: "4px",
    color: "white",
  },
}));

const SearchBar = (props: SearchBarProps) => {
  const classes = useStyles();
  return (
    <Box component={"form"}>
      <TextField
        autoComplete="off"
        onChange={props.onChangeQuery}
        className={classes.inputField}
        value={props.query}
        id="outlined-basic"
        label="Search For A Crypto Currency"
        variant="filled"
        style={{ width: "100%", marginBottom: 20 }}
      />
    </Box>
  );
};

export default SearchBar;
