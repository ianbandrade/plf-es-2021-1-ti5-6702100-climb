import axios from "axios";
import { authService } from "../services/authService";

const githubClient = axios.create({
  baseURL: `https://api.github.com/graphql`,
});

githubClient.interceptors.request.use(
  async (config) => {
    const me = await authService.me();
    const token = me.gitHubToken;

    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }

    return config;
  },
  function (error) {
    return Promise.reject(error);
  }
);

export { githubClient };
