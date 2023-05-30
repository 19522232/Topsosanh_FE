import axios from "axios";

const PRODUCT_API_BASE_URL = "https://localhost:5001/api/CrawlData/Common?";

export const getProduct = {
  name: "getProduct",
  fn: async (PageNumber, Quantity, keyword, isAscending) => {
    return axios.get(
      `${PRODUCT_API_BASE_URL}PageNumber=${PageNumber}&Quantity=${Quantity}&Keyword=${keyword}&IsAscending=${isAscending}`,
      {
        headers: {
          Accept:
            "text/html,application/xhtml+xml,application/xml;q=0.9,image/avif,image/webp,image/apng,*/*;q=0.8,application/signed-exchange;v=b3;q=0.9",
          "Accept-Language": "en-US,en;q=0.9,vi;q=0.8",
          "Cache-Control": "max-age=0",
          "Upgrade-Insecure-Requests": "1",
        },
      }
    );
  },
};
