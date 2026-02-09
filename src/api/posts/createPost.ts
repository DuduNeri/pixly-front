import { api } from "../conection";

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