import jwtDecode from "jwt-decode";
import { User } from "../interfaces/user";

export const TOKEN_KEY = "accessToken";
export const AVATAR_KEY = "avatarUrl";
export const USER_KEY = "currentUser";

export const isAuthenticated = (): boolean =>
  sessionStorage.getItem(TOKEN_KEY) !== null;

export const getAccessToken = (): string =>
  sessionStorage.getItem(TOKEN_KEY) ?? "";

export const getCurrentUser = (): User =>
  JSON.parse(sessionStorage.getItem(USER_KEY) ?? "{}");

export const setCurrentUser = (user: User) =>
  sessionStorage.setItem(USER_KEY, JSON.stringify(user));

export const login = (token: string): void => {
  sessionStorage.setItem(TOKEN_KEY, token);
  setCurrentUser(jwtDecode(token));
};

export const setUserAvatarUrl = (avatarUrl: string): void => {
  sessionStorage.setItem(AVATAR_KEY, avatarUrl);
};

export const logout = (): void => {
  sessionStorage.removeItem(TOKEN_KEY);
  sessionStorage.removeItem(USER_KEY);
  sessionStorage.removeItem(AVATAR_KEY);
};
