import { api } from "../conection";
import { type Post } from "../types/post";

export async function createPosts(data:Post) {
     try {
        const response = await api.post("/api/post", data)
        return response.data;
     } catch (error) {
        console.log(error)
     }
}