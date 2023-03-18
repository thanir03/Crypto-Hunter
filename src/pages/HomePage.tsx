import React, { useCallback, useContext, useEffect, useState } from "react";
import Banner from "../components/HomePage/Banner/Banner";
import CoinsTable from "../components/HomePage/CoinsTable/CoinsTable";
import { useFetch } from "../hooks/useFetch";
import { AppContext } from "../store/AppContext";
import { CoinsListType, getCoinsList } from "../api/coinListApi";
import { AxiosError } from "axios";

const HomePage = () => {
  const { loading, handleLoading, handleSuccess, handleError, error } =
    useFetch();
  const { currency } = useContext(AppContext);
  const [coinsList, setCoinsList] = useState<CoinsListType[]>([]);
  const apiCall = useCallback(async () => {
    try {
      handleLoading();
      const data = await getCoinsList(currency);
      setCoinsList(data);
      handleSuccess();
    } catch (error) {
      const axiosError = error as AxiosError;
      handleError(axiosError);
    }
  }, [currency, handleLoading, handleSuccess, handleError]);

  useEffect(() => {
    apiCall();
  }, [apiCall]);

  useEffect(() => {
    document.title = "Crypto Hunter";
  }, []);

  return (
    <>
      <Banner data={coinsList.slice(0, 10)} loading={loading} />
      <CoinsTable data={coinsList} loading={loading} />
      {error && <p style={{ textAlign: "center" }}>{"Failed to fetch data"}</p>}
    </>
  );
};

export default HomePage;

// Banner
//  -Carousel

// Home Page
// Carousal
// CoinsTable
//  -Search Bar
//  -Coin Header
//  -Coin List
//  -Coin Item
// Pagination
