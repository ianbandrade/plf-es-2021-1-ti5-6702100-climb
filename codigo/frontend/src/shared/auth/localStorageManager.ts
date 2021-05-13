import jwtDecode from "jwt-decode";
import { User } from "../interfaces/user";

export const TOKEN_KEY = "accessToken";
export const USER_KEY = "currentUser";

export const getCurrentUser = (): User =>
  JSON.parse(sessionStorage.getItem(USER_KEY) ?? "{}");

export const setCurrentUser = (user: User) =>
  sessionStorage.setItem(USER_KEY, JSON.stringify(user));

export const clearCurrentUser = (): void => {
  sessionStorage.removeItem(USER_KEY);
};
