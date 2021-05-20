import axios from "axios";
import { getAccessToken } from "../auth/localStorageManager";

const apiClient = axios.create({
  baseURL: `http://${process.env.NEXT_PUBLIC_API_HOST}`,
});

apiClient.interceptors.request.use(
  (config) => {
    const token = getAccessToken();

    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }

    return config;
  },
  function (error) {
    return Promise.reject(error);
  }
);

export default apiClient;
