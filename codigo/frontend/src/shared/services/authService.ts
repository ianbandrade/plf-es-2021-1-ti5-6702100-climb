import apiClient from "../api/api-client";
import { User } from "../interfaces/user";

class AuthService {
  private readonly DEFAULT_PATH = "auth";

  async me() {
    return (await apiClient.get<User>(`${this.DEFAULT_PATH}/me`)).data;
  }
}

export const authService = new AuthService();
