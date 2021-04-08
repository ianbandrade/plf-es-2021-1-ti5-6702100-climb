
import apiClient from "../api/api-client";
import { CreateUser } from "../interfaces/create-user";
import { FindUsersQuery } from "../interfaces/find-users-query";
import { UpdateUser } from "../interfaces/update-user";

class UserService {
  private readonly DEFAULT_PATH = "users"

  async getAll(findUsersQuery:FindUsersQuery){
    return (await apiClient.get(this.DEFAULT_PATH));
  }

  async get(id:string){
    return  apiClient.get(`${this.DEFAULT_PATH}/${id}`);
  }

  async create(createUser: CreateUser){
    return  apiClient.post(this.DEFAULT_PATH, createUser);
  }

  async createMany(createUsers: CreateUser[]){
    return  apiClient.post(`${this.DEFAULT_PATH}/batch`, createUsers);
  }

  async update(updateUser: UpdateUser){
    return  apiClient.patch(this.DEFAULT_PATH, updateUser);
  }

  async delete(id:string){
    return  apiClient.delete(`${this.DEFAULT_PATH}/${id}`);
  }
}

export const userService = new UserService();