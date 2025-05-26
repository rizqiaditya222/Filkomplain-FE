import axios from "axios";
import { setupInterceptors } from "./interceptors";

const api = axios.create({
  baseURL: "https://filkomplain-be.elginbrian.com/api/v1",
  timeout: 10000,
  headers: {
    "Content-Type": "application/json",
    Accept: "application/json",
  },
  withCredentials: true, // Enable sending cookies if your API requires authentication
});

setupInterceptors(api);

export default api;
