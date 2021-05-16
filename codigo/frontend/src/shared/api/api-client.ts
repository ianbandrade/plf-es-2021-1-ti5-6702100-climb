import axios from "axios";

const apiClient = axios.create({
  baseURL: `/api-client`,
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
