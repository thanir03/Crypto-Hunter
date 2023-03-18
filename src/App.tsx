import React, { Suspense, useContext } from "react";
import "./App.css";
import { Navigate, Route, Routes } from "react-router-dom";
import HomePage from "./pages/HomePage";
import { makeStyles } from "@material-ui/core";
import Header from "./components/UI/Header";
import LoadingScreen from "./pages/LoadingPage";
import ErrorPage from "./pages/ErrorPage";
import AlertBar from "./components/UI/AlertBar";
import UserProfile from "./components/UI/UserProfile";
import LoginModal from "./components/UI/loginModal";
import { AppContext } from "./store/AppContext";
const CoinPage = React.lazy(() => import("./pages/CoinPage"));

const useStyles = makeStyles(() => ({
  App: {
    backgroundColor: "#14161a",
    color: "#fff",
    minHeight: "100vh",
  },
}));

function App() {
  const { isLoggedIn } = useContext(AppContext);
  const classes = useStyles();

  return (
    <Suspense fallback={<LoadingScreen />}>
      <div className={classes.App}>
        <Header />
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/coins/:coinId" element={<CoinPage />} />
          <Route path="/404" element={<ErrorPage />} />
          <Route path="*" element={<Navigate to="/404" />} />
        </Routes>
        {isLoggedIn ? <UserProfile /> : <LoginModal />}
        <AlertBar />
      </div>
    </Suspense>
  );
}

export default App;
