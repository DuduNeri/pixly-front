import { api } from "../conection";

export async function updateAvatar(file: File) {
    const formData = new FormData();

    formData.append("avatar", file);

    const response = await api.post(
        "/posts/avatar",
        formData
    );

    return response.data;
}