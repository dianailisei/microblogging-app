import axios from "axios";

const API_BASE_URL = "http://13.40.200.183/";

export default axios.create({
  baseURL: API_BASE_URL,
});
