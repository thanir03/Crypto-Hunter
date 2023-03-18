// import React from "react";
import { User } from "firebase/auth";
import React from "react";

interface AlertType {
  message: string;
  showAlert: boolean;
  type: "success" | "error";
}

interface AppContextState {
  currency: string;
  onChangeCurrency: (currency: string) => void;
  user: User | null;
  isLoggedIn: boolean;
  alert: AlertType;
  showModal: boolean;
  showDrawer: boolean;
  userWatchList: Array<any>;
  onToggleModal: (isModalShown: boolean) => void;
  onChangeAlert: (
    showAlert: boolean,
    message: string,
    type: "success" | "error"
  ) => void;
  onLogout: () => void;
  onToggleDrawer: (isDrawerShown: boolean) => void;
}

const AppContext = React.createContext<AppContextState>({
  currency: "USD",
  user: null,
  isLoggedIn: false,
  showModal: false,
  alert: {
    message: "",
    showAlert: false,
    type: "error",
  },
  showDrawer: false,
  userWatchList: [],
  onChangeCurrency: (currency: string) => {},
  onToggleModal: (isModelShown: boolean) => {},
  onChangeAlert: (showAlert: boolean, message: string) => {},
  onLogout: () => {},
  onToggleDrawer: (isDrawerShown: boolean) => {},
});

export { AppContext };

export type { AppContextState, AlertType };
