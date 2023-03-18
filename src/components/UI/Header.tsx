import {
  AppBar,
  Container,
  ThemeProvider,
  Toolbar,
  Typography,
  createTheme,
  makeStyles,
} from "@material-ui/core";
import React, { useContext } from "react";
import { useNavigate } from "react-router-dom";
import { AppContext } from "../../store/AppContext";
import CurrencyOption from "./CurrencyOption";
import DefaultProfile from "../../assets/default-profile.jpg";

const useStyles = makeStyles(() => ({
  title: {
    flex: 1,
    color: "gold",
    fontFamily: "Montserrat",
    fontWeight: "bold",
    cursor: "pointer",
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

const Header = () => {
  const navigate = useNavigate();
  const classes = useStyles();
  const { isLoggedIn, user, onToggleDrawer, onToggleModal } =
    useContext(AppContext);
  return (
    <ThemeProvider theme={darkTheme}>
      <AppBar color="transparent" position="static">
        <Container>
          <Toolbar>
            <Typography
              variant="h6"
              onClick={() => navigate("/ ")}
              className={classes.title}
            >
              Crypto Hunter
            </Typography>
            <div style={{ display: "flex", alignItems: "center", gap: 30 }}>
              <CurrencyOption />
              {isLoggedIn ? (
                <figure
                  onClick={onToggleDrawer.bind(null, true)}
                  style={{ cursor: "pointer", height: "50px" }}
                >
                  <img
                    height={50}
                    style={{ borderRadius: "25%" }}
                    src={user!.photoURL ?? DefaultProfile}
                    alt={user!.displayName ?? "user"}
                  />
                </figure>
              ) : (
                <button
                  className="login-btn"
                  onClick={onToggleModal.bind(null, true)}
                >
                  Login
                </button>
              )}
            </div>
          </Toolbar>
        </Container>
      </AppBar>
    </ThemeProvider>
  );
};

export default Header;
