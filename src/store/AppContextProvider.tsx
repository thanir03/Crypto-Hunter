import { User, onAuthStateChanged } from "firebase/auth";
import { AlertType, AppContext } from "./AppContext";
import React, { useState, useEffect } from "react";
import { auth, database } from "../config/firebaseConfig";
import { doc, onSnapshot } from "firebase/firestore";

interface AppContextProviderProps {
  children: JSX.Element;
}
const AppContextProvider = (props: AppContextProviderProps) => {
  const [currency, setCurrency] = useState<string>("USD");
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [user, setUser] = useState<User | null>(null);
  const [showModal, setShowModal] = useState(false);
  const [showDrawer, setShowDrawer] = useState(false);
  const [userWatchList, setUserWatchList] = useState<Array<any>>([]);
  const [alert, setAlert] = useState<AlertType>({
    showAlert: false,
    message: "",
    type: "success",
  });

  const handleChangeCurrency = (currency: string) => {
    setCurrency(currency);
  };

  const handleLogoutAccount = async () => {
    try {
      await auth.signOut();
      handleChangeAlert(true, "Sign out successful", "success");
    } catch (error) {}
  };

  const handleChangeAlert = (
    showAlert: boolean,
    message: string,
    type: "success" | "error"
  ) => {
    setAlert({
      showAlert,
      message,
      type,
    });
  };

  const handleToggleModal = (isModalShown: boolean) => {
    setShowModal(isModalShown);
  };
  const handleToggleDrawer = (isDrawerShown: boolean) => {
    setShowDrawer(isDrawerShown);
  };
  useEffect(() => {
    onAuthStateChanged(auth, (user) => {
      if (user) {
        setIsLoggedIn(true);
        setUser(user);
      } else {
        setIsLoggedIn(false);
        setUser(null);
      }
    });
  }, []);

  useEffect(() => {
    let unsubscribe = () => {};
    if (isLoggedIn) {
      const coinRef = doc(database, "watchlist", user!.uid);
      unsubscribe = onSnapshot(coinRef, (coin) => {
        if (coin.exists()) {
          setUserWatchList(coin.data().watchList);
        }
      });
    }
    return unsubscribe;
  }, [isLoggedIn, user]);

  return (
    <AppContext.Provider
      value={{
        userWatchList,
        currency,
        showDrawer,
        user,
        isLoggedIn,
        alert,
        showModal,
        onToggleDrawer: handleToggleDrawer,
        onToggleModal: handleToggleModal,
        onChangeCurrency: handleChangeCurrency,
        onChangeAlert: handleChangeAlert,
        onLogout: handleLogoutAccount,
      }}
    >
      {props.children}
    </AppContext.Provider>
  );
};

export { AppContextProvider };
