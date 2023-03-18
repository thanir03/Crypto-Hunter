import React, { useContext, useEffect, useState, useCallback } from "react";
import { useNavigate, useParams } from "react-router-dom";
import CoinDetails from "../components/CoinPage/CoinDetails";
import CoinChart from "../components/CoinPage/CoinChart";
import { coinPageApiCall } from "../api/coinPageApi";
import { AppContext } from "../store/AppContext";
import { useFetch } from "../hooks/useFetch";
import { CircularProgress } from "@material-ui/core";

// make both api call in one request

const CoinPage = () => {
  const navigate = useNavigate();
  const params = useParams<{ coinId: string }>();
  const [coinDetails, setCoinDetails] = useState<any | null>(null);
  const [coinMarket, setCoinMarket] = useState<Array<[number, number]>>([]);
  const [interval, setInterval] = useState<number>(1);
  const { currency } = useContext(AppContext);
  const {
    loading,
    handleLoading,
    handleError: handleErrorMarketData,
    error: errorMarketData,
    handleSuccess: handleSuccessMarketData,
  } = useFetch();
  const {
    handleError: handleErrorCoinDetail,
    error: errorCoinDetail,
    handleSuccess: handleSuccessCoinDetail,
  } = useFetch();

  const apiCall = useCallback(async () => {
    handleLoading();
    const data = await coinPageApiCall(params.coinId!, currency, interval);
    if (data[0].status === "fulfilled") {
      setCoinDetails(data[0].value);
      handleSuccessCoinDetail();
    } else {
      setCoinDetails(null);
      handleErrorCoinDetail(data[0].reason);
    }
    if (data[1].status === "fulfilled") {
      setCoinMarket(data[1].value.prices);
      handleSuccessMarketData();
    } else {
      setCoinMarket([]);
      handleErrorMarketData(data[1].reason);
    }
  }, [
    interval,
    currency,
    params.coinId,
    handleLoading,
    handleErrorMarketData,
    handleErrorCoinDetail,
    handleSuccessCoinDetail,
    handleSuccessMarketData,
  ]);

  useEffect(() => {
    apiCall();
  }, [apiCall]);

  useEffect(() => {
    if (coinDetails) {
      document.title = coinDetails.name;
    }
  }, [coinDetails]);
  useEffect(() => {
    if (errorCoinDetail?.response?.status === 404) navigate("/404");
  }, [errorCoinDetail, navigate]);

  const handleChangeInterval = (interval: number) => setInterval(interval);

  return (
    <div className="coin-page-container">
      {!loading && coinDetails && (
        <CoinDetails data={coinDetails} coinId={params.coinId!} />
      )}
      {!loading && coinMarket.length > 0 && (
        <CoinChart
          interval={interval}
          onChangeInterval={handleChangeInterval}
          error={errorMarketData}
          data={coinMarket}
        />
      )}
      {loading && <CircularProgress size={100} />}
    </div>
  );
};

export default CoinPage;

// CoinDetails
// image
// title
// description
// rank
// currentPrice
// marketCap

// Graph
// 24 hours
// 30 days
// 3 months
// 1 <year></year>
