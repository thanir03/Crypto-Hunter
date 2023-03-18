interface CacheType {
  [key: string]: [any, number];
}

const NUMBER_OF_MILISECONDS_IN_HOUR = 1000 * 60 * 60;
class APICache {
  private cache: CacheType = {};
  getCache(url: string): any | null {
    if (!this.cache[url]) return null;
    const [data, expiryTime] = this.cache[url];
    if (new Date().getTime() > expiryTime) return null;
    return data;
  }
  setCache(url: string, data: any) {
    this.cache[url] = [
      data,
      new Date().getTime() + NUMBER_OF_MILISECONDS_IN_HOUR,
    ];
  }
  viewCache() {
    console.log(this.cache);
  }
}

const apiCacheData = new APICache();

export { apiCacheData };
