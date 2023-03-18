import React, { useContext } from "react";
import { AppContext } from "../../store/AppContext";
import HTMLReactParser from "html-react-parser";
import { doc, setDoc } from "firebase/firestore";
import { database } from "../../config/firebaseConfig";

interface coinDetailsProps {
  coinId: string;
  data: any;
}

const CoinDetails = (props: coinDetailsProps) => {
  const { data, coinId } = props;
  const { onChangeAlert, user, userWatchList, isLoggedIn } =
    useContext(AppContext);
  const isInWatchList = isLoggedIn && userWatchList.includes(coinId);

  const handleAddToWatchList = async () => {
    const coinRef = doc(database, `/watchlist/${user!.uid}`);
    try {
      await setDoc(coinRef, {
        watchList: [...userWatchList, coinId],
      });
      onChangeAlert(true, "Coin Added To Watchlist", "success");
    } catch (error) {
      onChangeAlert(true, "Coin Not Added To Watchlist", "error");
    }
  };

  const handleRemoveFromWatchList = async () => {
    const coinRef = doc(database, `/watchlist/${user!.uid}`);
    try {
      await setDoc(coinRef, {
        watchList: userWatchList.filter((item) => item !== coinId),
      });
      onChangeAlert(true, "Coin Removed From Watchlist", "success");
    } catch (error) {
      onChangeAlert(false, "Coin Not Removed To Watchlist", "error");
    }
  };

  const { currency } = useContext(AppContext);

  const coinMarketCap: number =
    data?.market_data.market_cap?.[currency.toLowerCase()];

  const coinCurrentPrice: number =
    data?.market_data?.current_price?.[currency.toLowerCase()];

  return (
    <div className="coin-details-container">
      <figure>
        <img height="200" src={data.image.large} alt={data.name} />
      </figure>
      <div className="coin-details-text">
        <h3>{data.name}</h3>
        <p style={{ fontSize: "20px" }}>
          {HTMLReactParser(data.description.en.split(". ")[0])}
        </p>
        <p className="important-text">Rank : {data.market_cap_rank}</p>
        <p className="important-text">
          Current Price :{" "}
          {` ${currency} ${coinCurrentPrice.toLocaleString("en-us")}`}
        </p>
        <p className="important-text">
          Market Cap :
          {` ${currency} ${Math.round(coinMarketCap / 10 ** 6).toLocaleString(
            "en-us"
          )} M`}
        </p>
        {isLoggedIn && !isInWatchList && (
          <button className="wishlist-btn" onClick={handleAddToWatchList}>
            Add To WatchList
          </button>
        )}
        {isLoggedIn && isInWatchList && (
          <button
            className="remove-wishlist-btn"
            onClick={handleRemoveFromWatchList}
          >
            Remove From WatchList
          </button>
        )}
      </div>
    </div>
  );
};

export default CoinDetails;

// Image
// Title
// Description
// Meta Data (Ranks , current Price , Market Cap )
