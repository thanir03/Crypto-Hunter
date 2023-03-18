import axios, { AxiosError, AxiosResponse } from "axios";
import { apiCacheData } from "./api";

const url = new URL(`https://api.coingecko.com/api/v3/coins/`);

export const getCoinDetails = async (coinId: string) => {
  try {
    const coinDetailsURL = `${url.toString()}${coinId}`;
    const cachedData = apiCacheData.getCache(coinDetailsURL);
    if (cachedData) return cachedData;
    const response: AxiosResponse<any> = await axios({
      method: "GET",
      url: coinDetailsURL,
      headers: {
        "Access-Control-Allow-Origin": "https://localhost:3000/",
      },
    });
    apiCacheData.setCache(url.toString(), response.data);
    return response.data;
  } catch (error) {
    const axiosError = error as AxiosError;
    throw axiosError;
  }
};
