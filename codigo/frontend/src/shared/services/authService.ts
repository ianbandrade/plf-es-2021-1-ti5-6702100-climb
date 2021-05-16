import axios from "axios";
import { NextRouter, useRouter } from "next/router";
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

  async me(): Promise<User | void> {
    return await apiClient
      .get<User>(`${this.DEFAULT_PATH}/me`)
      .then((res) => {
        setCurrentUser(res.data);
        return res.data;
      })
      .catch(() => {
        clearCurrentUser();
        return;
      });
  }

  async signIn(credentials: { email: string; password: string }) {
    const user = (
      await apiClient.post<{ success: boolean; user: User }>(
        `${this.DEFAULT_PATH}/signin`,
        credentials
      )
    ).data.user;
    setCurrentUser(user);
    return user;
  }

  async logout(router: NextRouter) {
    await apiClient
      .post<boolean>(`${this.DEFAULT_PATH}/logout`)
      .catch()
      .finally(() => {
        clearCurrentUser();
        router.push(this.LOGIN_PATH);
      });
  }

  async isAuthenticated(
    router: NextRouter,
    redirectPath: { success?: string; error?: string; useDefault?: boolean }
  ): Promise<boolean> {
    const result = getCurrentUser() && this.me();

    if (!result) {
      if (redirectPath.useDefault) router.push(this.LOGIN_PATH);
      else if (redirectPath.error) router.push(redirectPath.error);
      return false;
    } else {
      if (redirectPath.success) router.push(redirectPath.success);
      return true;
    }
  }
}

export const authService = new AuthService();
