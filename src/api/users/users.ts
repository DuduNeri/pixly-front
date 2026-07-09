import { api } from "../conection";

export async function getUsers() {
  try {
    const users = await api.get("/users")
    return users
  } catch (error) {
    console.log("Erro ao buscar usuários:",error)
    throw error;
  }
}

export async function getUser(userId: string) {
  try {
    const response = await api.get(`/user/${userId}`);
    return response.data;
  } catch (error) {
    console.log("Erro ao buscar usuário:", error);
    throw error;
  }
}