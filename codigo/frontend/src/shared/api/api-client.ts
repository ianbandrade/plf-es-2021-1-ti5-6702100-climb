import axios from "axios";

const baseURL =
  process.env.NODE_ENV !== "production"
    ? `/api-client`
    : process.env.NEXT_PUBLIC_API_HOST;

const apiClient = axios.create({
  baseURL,
});

// apiClient.interceptors.request.use((config) => {
//   const token = getAccessToken();

//   if (token) {
//     config.headers.Authorization = `Bearer ${token}`;
//   }

//   return config;
// }, function (error) {
//   return Promise.reject(error);
// });

export default apiClient;
