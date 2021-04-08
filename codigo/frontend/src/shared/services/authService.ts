
import apiClient from "../api/api-client";

class AuthService {
  private readonly DEFAULT_PATH = "auth"

  async me(){
    return apiClient.get(`${this.DEFAULT_PATH}/me`);
  }
}

export const authService = new AuthService();