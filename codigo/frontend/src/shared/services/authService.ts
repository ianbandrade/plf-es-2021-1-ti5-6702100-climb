import axios from "axios";
import apiClient from "../api/api-client";
import {
  setCurrentUser,
  clearCurrentUser,
  getCurrentUser,
} from "../auth/localStorageManager";
import { User } from "../interfaces/user";

class AuthService {
  private readonly DEFAULT_PATH = "auth";
  public readonly LOGIN_PATH = "/";

  async me(): Promise<User | undefined> {
    try {
      const user = (await apiClient.get<User>(`${this.DEFAULT_PATH}/me`)).data;
      setCurrentUser(user);
      return user;
    } catch (e) {
      if (e.status === 401) {
        this.logout();
        return;
      }
    }
  }

  async signIn(credentials: { email: string; password: string }) {
    const user = (
      await axios.post<{ success: boolean; user: User }>(
        `api/login`,
        credentials
      )
    ).data.user;
    setCurrentUser(user);
    return user;
  }

  async logout() {
    await apiClient.post<User>(`${this.DEFAULT_PATH}/logout`);
    clearCurrentUser();
    return;
  }
}

export const authService = new AuthService();
