import React, { useEffect, useContext, useCallback, useState } from "react";
import { AppContext } from "../../store/AppContext";
import { getCoinDetails } from "../../api/coinDetailsApi";
import { doc, setDoc } from "firebase/firestore";
import { database } from "../../config/firebaseConfig";

const Watchlist = () => {
  const { userWatchList, currency, user, onChangeAlert } =
    useContext(AppContext);
  const [watchListDetails, setWatchListDetails] = useState<Array<any>>([]);

  const apiCall = useCallback(async () => {
    const data = await Promise.all(
      userWatchList.map(async (item) => getCoinDetails(item))
    );
    setWatchListDetails(data);
  }, [userWatchList]);

  const handleRemoveFromWatchList = async (coinId: string) => {
    const coinRef = doc(database, `/watchlist/${user!.uid}`);
    try {
      await setDoc(coinRef, {
        watchList: userWatchList.filter((item) => item !== coinId),
      });
      onChangeAlert(true, "Coin Removed From watchlist", "success");
    } catch (error) {
      onChangeAlert(false, "Coin unable to remove from watchlist", "error");
    }
  };

  useEffect(() => {
    apiCall();
  }, [apiCall]);

  return (
    <div className="watchlist-container" style={{ color: "white" }}>
      <h3>Watch List</h3>
      {watchListDetails &&
        watchListDetails.map((item) => (
          <div className="watchlist" key={item.id}>
            <img src={item.image.large} alt="" />
            <p>{item.name}</p>
            <p>
              {currency}{" "}
              {item.market_data.current_price[currency.toLowerCase()]}
            </p>
            <button
              onClick={() => handleRemoveFromWatchList(item.id)}
              className="remove-btn"
            >
              Remove
            </button>
          </div>
        ))}
    </div>
  );
};

export default Watchlist;
