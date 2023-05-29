import axios from "axios";

//https://testthiensua.bsite.net/api/CrawlData/Common?PageNumber=1&Quantity=10&Keyword=tai%20nghe&IsAscending=true
const PRODUCT_API_BASE_URL = "https://localhost:5001/api/ProductTracking";
// "http://ntsuatest-001-site1.itempurl.com/api/CrawlData/gearvn?keyword=";

class trackingService {
  getProductURL(itemURL) {
    return axios.get(
      `${PRODUCT_API_BASE_URL}/TrackingResult?productUrl=${itemURL}`
    );
  }
  sendInfo(infor) {
    return axios.post(`${PRODUCT_API_BASE_URL}/Subscribe`, infor);
  }

  sendNotif(infor) {
    return axios.post(`${PRODUCT_API_BASE_URL}/SubscribeCustom`, infor);
  }
}

export default new trackingService();
