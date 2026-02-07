import { api } from "../conection";
import { type CreatePost, type Post } from "../types/post";

export async function createPosts(data: CreatePost) {
   try {
      const token = localStorage.getItem("token")
      const response = await api.post("api/post", data, {
         headers: {
            Authorization: `Bearer ${token}`,
         },
      })
      return response.data;
   } catch (error) {
      console.log(error)
   }
}