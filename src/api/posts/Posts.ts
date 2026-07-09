import { api } from "../conection";
import type {
  CreateCommentDTO,
  GetCommentDTO,
  IPosts,
  Post,
} from "../types/post";

export const createPosts = async (postData: any) => {
  const formData = new FormData();
  formData.append("title", postData.title);
  formData.append("contentText", postData.contentText);
  console.log(formData);

  if (postData.contentImage) {
    formData.append("contentImage", postData.contentImage);
  }

  const response = await api.post("/posts", formData);
  return response.data;
};

export async function getPosts(): Promise<Post[]> {
  try {
    const { data } = await api.get<Post[]>("/posts/users");
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

export async function createLike(userId: string, postId: string) {
  try {
    const response = await api.post(`/like/${userId}`, {
      postId,
    });
    return response.data;
  } catch (error) {
    console.error("Erro ao curtir post:", error);
    throw error;
  }
}

export async function getComments(id: string): Promise<GetCommentDTO[]> {
  try {
    const response = await api.get(`/posts/${id}/comments`);
    return response.data;
  } catch (error) {
    console.error("Erro ao buscar comentario:", error);
    throw error;
  }
}

export async function createComment(data: CreateCommentDTO) {
  try {
    const response = await api.post(`/posts/comment/${data.userId}`, data);
    
    console.log(response);
    return response.data;
  } catch (error) {
    console.error("Erro ao criar comentário na API:", error);
    throw error;
  }
}

export async function deleteComment(id: string) {
  try {
    const response = await api.delete(`/posts/comment/${id}`);
    console.log(response);
    return response.data;
  } catch (error: any) {
    console.error("Erro ao excluir comentário:", error.response?.data?.error || error.message);
    throw error;
  }
}

