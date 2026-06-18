import { api } from "../conection";
import type { IPosts, Post, PostAttributes } from "../types/post";

export const createPosts = async (postData: any) => {
  const formData = new FormData();
  formData.append("title", postData.title);
  formData.append("contentText", postData.contentText);
  console.log(formData)

  if (postData.contentImage) {
    formData.append("contentImage", postData.contentImage);
  }

  const response = await api.post("/posts", formData);
  return response.data;
};

export async function getPosts(): Promise<Post[]> {
  try {
    const { data } = await api.get<Post[]>("/posts");
    return data || [];
  } catch (error) {
    console.error("Erro ao buscar posts:", error);
    return [];
  }
}

export async function deletePost(id: string): Promise<IPosts> {
  try {
    const { data } = await api.delete(`/post/${id}`);
    return data as IPosts;
  } catch (error) {
    console.error("Erro ao exluir post:", error);
    throw error;
  }
}

export async function getPostsByUser(userId: string): Promise<Post[]> {
  try {
    const { data } = await api.get(`/posts/${userId}`);
    return data;  
  } catch (error) {
    console.error("Erro ao buscar posts do usuário:", error);
    throw error;
  }
}