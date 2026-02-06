import { api } from "../conection";
import type { Post } from "../types/post";

export async function getPosts(): Promise<Post[]> {
  try {
    const { data } = await api.get<Post[]>("/api/posts");
    return data;
  } catch (error) {
    console.error("Erro ao buscar posts:", error);
    throw error;
  }
}