import { getCoinDetails } from "./coinDetailsApi";
import { getCoinMarketData } from "./marketChartApi";

const coinPageApiCall = async (
  coinId: string,
  currency: string,
  days: number
) => {
  const data = await Promise.allSettled([
    getCoinDetails(coinId),
    getCoinMarketData(coinId, currency, days),
  ]);

  return data;
};

export { coinPageApiCall };
