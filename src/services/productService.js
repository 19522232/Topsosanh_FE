import axios from "axios";

//https://testthiensua.bsite.net/api/CrawlData/Common?PageNumber=1&Quantity=10&Keyword=tai%20nghe&IsAscending=true
const PRODUCT_API_BASE_URL = "http://localhost:5000/api/CrawlData/Common?";
// "http://ntsuatest-001-site1.itempurl.com/api/CrawlData/gearvn?keyword=";

class productService {
  getProduct(PageNumber, Quantity, keyword, isAscending) {
    return axios.get(
      `${PRODUCT_API_BASE_URL}PageNumber=${PageNumber}&Quantity=${Quantity}&Keyword=${keyword}&IsAscending=${isAscending}&searchText=""`,
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
  }
}

export default new productService();
