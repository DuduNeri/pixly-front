import { api } from "../conection";
import type { IPosts, Post } from "../types/post";

export const createPosts = async (postData: any) => {
   const formData = new FormData();
   formData.append("title", postData.title);
   formData.append("contentText", postData.contentText);

   if (postData.contentImage) {
      formData.append("contentImage", postData.contentImage);
   }

   const response = await api.post("/posts", formData);
   return response.data;
};


export async function getPosts(): Promise<Post[]> {
  try {
    const { data } = await api.get<Post[]>("/posts");
    return data;
  } catch (error) {
    console.error("Erro ao buscar posts:", error);
    throw error;
  }
}

export async function deletePost(id: string): Promise<IPosts> {
   try {
      const {data} = await api.delete(`/post/${id}`)
      return data as IPosts
   } catch (error) {
      console.error("Erro ao exluir post:", error);
      throw error;
   }
}