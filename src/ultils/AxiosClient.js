import axios from "axios";

const AxiosClient = axios.create({
  baseURL: "http://localhost:5000/api/",
  headers: {
    "Content-Type": "application/json",
  },
});

//Add a request interceptor
AxiosClient.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("token");
    config.headers["Authorization"] = `Bearer ${token || ""}`;
    config.headers["Content-Type"] = "application/json";
    return config;
  },
  (error) => {
    console.log(error.response.data.errors.toString());
    // Do something with request error
    return error;
  }
);

// Add a response interceptor
AxiosClient.interceptors.response.use(
  async (response) => {
    return response;
  },
  (error) => {
    // if(error.response.status==400)
    // alert(error.response.data.errors.toString())
    return error.response;
  }
);

export const get = async (url, params = {}, config = {}) =>
  await AxiosClient.get(url, { headers: { ...config }, params });

export const post = async (url, data, config = {}) =>
  await AxiosClient.post(url, data, { headers: { ...config } });

export const put = async (url, data, config = {}) =>
  await AxiosClient.put(url, data, { headers: { ...config } });

export const _delete = async (url, data, config = {}) =>
  await AxiosClient.delete(url, {
    data,
    headers: { ...config },
  });

export default AxiosClient;
