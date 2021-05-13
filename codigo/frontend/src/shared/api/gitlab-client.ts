import axios from "axios";
import { authService } from "../services/authService";

const gitlabClient = axios.create({
  baseURL: `https://gitlab.com/api/graphql`,
});

gitlabClient.interceptors.request.use(
  async (config) => {
    const me = await authService.me();
    if (!me) return {};

    const token = me.gitLabToken;

    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }

    return config;
  },
  function (error) {
    return Promise.reject(error);
  }
);

export { gitlabClient };
