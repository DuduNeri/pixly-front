import { api } from "../conection";

export async function updateAvatar(userId: string, file: File) {
    const formData = new FormData();

    // ALTERADO: Mudou de "contentImage" para "avatar"
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

    return response.data; // Vai retornar o JSON que o backend enviar
}

