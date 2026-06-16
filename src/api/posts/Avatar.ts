import { api } from "../conection";

export async function updateAvatar(userId: string, file: File) {
    const formData = new FormData();

    formData.append("avatar", file);

    const response = await api.post(
        `/posts/${userId}`,
        formData,
        {
            headers: {
                "Content-Type": "multipart/form-data",
            },
        }
    );

    return response.data; 
}

export async function getAvatar(userId: string, file: File) {
    const formData = new FormData();

    formData.append("avatar", file);

    const response = await api.post(
        `/posts/avatar/${userId}`,
        formData,
        {
            headers: {
                "Content-Type": "multipart/form-data",
            },
        }
    );

    return response.data;
}