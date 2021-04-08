import jwtDecode from "jwt-decode";
import { User } from "../interfaces/user";

export const TOKEN_KEY = 'accessToken';

export const isAuthenticated = (): boolean => window?.sessionStorage.getItem(TOKEN_KEY) !== null;

export const getAccessToken = (): string => window?.sessionStorage.getItem(TOKEN_KEY) ?? '';

export const login = (token: string): void => {
  sessionStorage.setItem(TOKEN_KEY, token);
};

export const logout = (): void => {
  sessionStorage.removeItem(TOKEN_KEY);
};

export const getCurrentUser = (): User => jwtDecode(getAccessToken()) as User