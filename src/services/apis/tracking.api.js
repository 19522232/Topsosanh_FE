import axios from "axios";

const PRODUCT_API_BASE_URL = "https://localhost:5001/api/ProductTracking";

export const getProductURL = {
  name: "getProductURL",
  fn: async (itemURL) => {
    return axios.get(
      `${PRODUCT_API_BASE_URL}/TrackingResult?productUrl=${itemURL}`
    );
  },
};

export const sendInfo = {
  name: "sendInfo",
  fn: async (infor) => {
    return axios.post(`${PRODUCT_API_BASE_URL}/Subscribe`, infor);
  },
};

export const sendNotif = {
  name: "sendNotif",
  fn: async (infor) => {
    return axios.post(`${PRODUCT_API_BASE_URL}/SubscribeCustom`, infor);
  },
};
