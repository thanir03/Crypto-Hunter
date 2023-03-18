import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";
import { BrowserRouter } from "react-router-dom";
import "react-alice-carousel/lib/alice-carousel.css";
import { AppContextProvider } from "../src/store/AppContextProvider";

const root = ReactDOM.createRoot(
  document.getElementById("root") as HTMLElement
);
root.render(
  <AppContextProvider>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </AppContextProvider>
);
