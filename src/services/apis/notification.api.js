import axios from "axios";

const PRODUCT_API_BASE_URL =
  "http://localhost:5000/api/CrawlData/TestCrawlPriceNewShop";

export const getProductSelector = {
  name: "getProductSelector",
  fn: async (itemURL, itemSelector) => {
    return axios.get(
      `${PRODUCT_API_BASE_URL}?productUrl=${encodeURIComponent(
        itemURL
      )}&priceSelector=${encodeURIComponent(itemSelector)}
            `
    );
  },
};
