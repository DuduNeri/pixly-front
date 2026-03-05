import { api } from "../conection";
import type { IUserResponse } from "../types/users.type";

export async function getUsers() {
  try {
    const users = await api.get("/users")
    return users
  } catch (error) {
    console.log("Erro ao buscar usuários:",error)
    throw error;
  }
}