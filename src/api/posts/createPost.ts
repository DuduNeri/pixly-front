import { api } from "../conection";
import { type CreatePost, type Post } from "../types/post";

export async function createPosts(data:CreatePost) {
     try {
        const response = await api.post("api/post", data)
        return response.data;
     } catch (error) {
        console.log(error)
     }
}