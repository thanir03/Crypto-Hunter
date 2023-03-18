import axios, { AxiosError, AxiosResponse } from "axios";
import { apiCacheData } from "./api";

const url = new URL(
  `https://api.coingecko.com/api/v3/coins/bitcoin/market_chart`
);

export interface MarketChartData {
  prices: Array<[number, number]>;
  market_caps: Array<[number, number]>;
  total_volumes: Array<[number, number]>;
}

const getCoinMarketData = async (
  coinId: string,
  currency: string,
  days: number
) => {
  const interval = days === 1 ? "hourly" : days === 30 ? "daily" : "monthly";
  url.searchParams.set("id", coinId);
  url.searchParams.set("vs_currency", currency);
  url.searchParams.set("days", `${days}`);
  url.searchParams.set("interval", interval);
  try {
    const cachedData = apiCacheData.getCache(url.toString());
    if (cachedData) return cachedData;
    const response: AxiosResponse<MarketChartData> = await axios({
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
export { getCoinMarketData };
