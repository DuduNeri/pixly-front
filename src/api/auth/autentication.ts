import { api } from "../conection";

export async function loginUser(name: string, password: string) {
    const response = await api.post("/login", { name, password });

    localStorage.setItem("userName", response.data.user.name);
    localStorage.setItem("token", response.data.token);
    localStorage.setItem("userId", response.data.user.id);
    return response;
}

export async function register(name: string, email: string, password: string) {
    const response = await api.post("/create", { name, email, password });

    localStorage.setItem("token", response.data.token);
    localStorage.setItem("userId", response.data.user.id);
    localStorage.setItem("userName", response.data.user.name);

    return response.data;
}

