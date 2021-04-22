import apiClient from "../api/api-client";
import { setCurrentUser } from "../auth/localStorageManager";
import { User } from "../interfaces/user";

class AuthService {
  private readonly DEFAULT_PATH = "auth";

  async me(): Promise<User> {
    const user = (await apiClient.get<User>(`${this.DEFAULT_PATH}/me`)).data;
    setCurrentUser(user);
    return user;
  }
}

export const authService = new AuthService();
