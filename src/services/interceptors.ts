import { AxiosInstance, AxiosError, AxiosResponse } from "axios";

export const setupInterceptors = (axiosInstance: AxiosInstance) => {
  axiosInstance.interceptors.request.use(
    (config) => {
      const token = localStorage.getItem("token");

      if (token) {
        config.headers.Authorization = `Bearer ${token}`;
      }

      return config;
    },
    (error: AxiosError) => {
      return Promise.reject(error);
    }
  );

  axiosInstance.interceptors.response.use(
    (response: AxiosResponse) => {
      return response;
    },
    async (error: AxiosError) => {
      // Improved error handling for debugging CORS issues
      if (error.message === "Network Error") {
        console.error("Possible CORS error:", error);
        // Log detailed information to help debugging
        console.log("Request URL:", error.config?.url);
        console.log("Request Method:", error.config?.method);
        console.log("Request Headers:", error.config?.headers);
      }

      const originalRequest = error.config;

      if (error.response?.status === 401 && originalRequest) {
        localStorage.removeItem("token");
        window.location.href = "/login";
      }

      return Promise.reject(error);
    }
  );
};
