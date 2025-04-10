import axios from "axios";
import { API_URL } from ".";

// Create an Axios instance
const axiosInstance = axios.create({
  baseURL: API_URL, // Set base URL
  timeout: 10000, // Timeout for requests (in ms)
});

export default axiosInstance;
