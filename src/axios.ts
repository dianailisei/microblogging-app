import axios from "axios";

const API_BASE_URL = "http://13.40.200.183/";

const axiosInstance  =  axios.create({
  baseURL: API_BASE_URL,
});
axiosInstance .interceptors.request.use(
  config => {
    const accessToken = localStorage.getItem('accessToken');
    if (accessToken) {
      config.headers.Authorization = accessToken;
    }
    
    return config;
  },
  error => {
    return Promise.reject(error);
  }
);
export default axiosInstance;