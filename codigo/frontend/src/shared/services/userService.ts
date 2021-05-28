
import apiClient from "../api/api-client";
import { CreateManyUsers } from "../interfaces/create-many";
import { CreateUser } from "../interfaces/create-user";
import { FindUsersQuery } from "../interfaces/find-users-query";
import { UpdateUser } from "../interfaces/update-user";

class UserService {
  private readonly DEFAULT_PATH = "users"

  async getAll(findUsersQuery:FindUsersQuery){
    let querys = '';
    
    (Object.keys(findUsersQuery) as (keyof FindUsersQuery)[]).forEach(key => { querys += (findUsersQuery[key] ? `${key}=${findUsersQuery[key]}&`  : '') });

    return (await apiClient.get(`${this.DEFAULT_PATH}?${querys}`));
  }

  async get(id:string){
    return apiClient.get(`${this.DEFAULT_PATH}/${id}`);
  }

  async create(createUser: CreateUser){
    return apiClient.post(this.DEFAULT_PATH, createUser);
  }

  async createMany(createUsers: CreateManyUsers){
    return apiClient.post(`${this.DEFAULT_PATH}/batch`, createUsers);
  }

  async update(userId: string, updateUser: UpdateUser){
    return apiClient.patch(`${this.DEFAULT_PATH}/${userId}`, updateUser);
  }

  async delete(id:string){
    return apiClient.delete(`${this.DEFAULT_PATH}/${id}`);
  }
}

export const userService = new UserService();