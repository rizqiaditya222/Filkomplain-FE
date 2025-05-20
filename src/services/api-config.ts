import axios from "axios";
import { setupInterceptors } from "./interceptors";

const api = axios.create({
  baseURL: process.env.REACT_APP_API_URL || "https://filkomplain-be.elginbrian.com/api/v1",
  timeout: 10000,
  headers: {
    "Content-Type": "application/json",
    Accept: "application/json",
  },
});

setupInterceptors(api);

export default api;
