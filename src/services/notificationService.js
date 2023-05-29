import axios from "axios";

const PRODUCT_API_BASE_URL =
  "https://localhost:5001/api/CrawlData/TestCrawlPriceNewShop";

//https://testthiensua.bsite.net/api/CrawlData/TestCrawlPriceNewShop?productUrl=https%3A%2F%2Fgearvn.com%2Fproducts%2Flaptop-gaming-acer-nitro-5-eagle-an515-57-54mv&priceSelector=%23add-item-form-2%20%3E%20div.product_na_btn%20%3E%20div%20%3E%20span.product_sale_price
class notificationService {
  getProductSelector(itemURL, itemSelector) {
    return axios.get(
      `${PRODUCT_API_BASE_URL}?productUrl=${encodeURIComponent(
        itemURL
      )}&priceSelector=${encodeURIComponent(itemSelector)}
      `
    );
  }
}

export default new notificationService();
