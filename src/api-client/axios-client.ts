import axios, { AxiosError, InternalAxiosRequestConfig } from "axios";

const axiosClient = axios.create({
  baseURL: "/api",
  headers: {
    "Content-Type": "application/json",
  },
});

// Add a response interceptor
axiosClient.interceptors.response.use(
  function (response) {
    // Any status code that lie within the range of 2xx cause this function to trigger
    // Do something with response data
    return response.data;
  },
  function (error: AxiosError) {
    // Any status codes that falls outside the range of 2xx cause this function to trigger
    // Do something with response error
    // 401, 403, 500
    return Promise.reject(error.response?.data); // should be error response body
  }
);
axiosClient.interceptors.request.use(function (
  config: InternalAxiosRequestConfig<any>
) {
  let userID: string | null = localStorage.getItem("userId");
  if (userID) {
    config.headers["client-id"] = userID;
    // config.headers['Content-Type'] = 'multipart/form-data';
  }
  return config;
});

export default axiosClient;
