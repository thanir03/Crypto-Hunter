import axios, { AxiosError, AxiosResponse } from "axios";
import { apiCacheData } from "./api";

const url = new URL(`https://api.coingecko.com/api/v3/coins/markets`);

export interface CoinsListType {
  id: string;
  symbol: string;
  name: string;
  image: string;
  current_price: number;
  market_cap: number;
  market_cap_rank: number;
  fully_diluted_valuation: number;
  total_volume: number;
  high_24h: number;
  low_24h: number;
  price_change_24h: -855;
  price_change_percentage_24h: number;
  market_cap_change_24h: number;
  market_cap_change_percentage_24h: number;
  circulating_supply: number;
  total_supply: number;
  max_supply: number;
  ath: number;
  ath_change_percentage: number;
  ath_date: string;
  atl: number;
  atl_change_percentage: number;
  atl_date: string;
  roi: {
    currency: string;
    percentage: number;
    times: number;
  } | null;
  last_updated: string;
}

const getCoinsList = async (currency: string) => {
  url.searchParams.set("vs_currency", currency);
  url.searchParams.set("order", "market_cap_desc");
  const cachedData = apiCacheData.getCache(url.toString());
  if (cachedData) return cachedData;
  try {
    const response: AxiosResponse<CoinsListType[]> = await axios({
      method: "GET",
      url: url.toString(),
      headers: {
        "Access-Control-Allow-Origin": "http://localhost:3000",
      },
    });
    apiCacheData.setCache(url.toString(), response.data);
    return response.data;
  } catch (error) {
    const axiosError = error as AxiosError;
    throw axiosError;
  }
};

export { getCoinsList };
