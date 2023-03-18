import axios, { AxiosError, AxiosResponse } from "axios";
import { apiCacheData } from "./api";
const url = new URL(
  "https://api.coingecko.com/api/v3/simple/supported_vs_currencies"
);

export const getSupportedCurrencyApi = async () => {
  const cachedData = apiCacheData.getCache(url.toString());
  if (cachedData) return cachedData;
  try {
    const response: AxiosResponse<Array<string>> = await axios({
      url: url.toString(),
      method: "GET",
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
