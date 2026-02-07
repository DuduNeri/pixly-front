import { api } from "../conection";

export async function loginUser(name: string, password: string) {
    const response = await api.post("/api/login", { name, password });

    localStorage.setItem("userName", response.data.user.name);
    localStorage.setItem("token", response.data.token);
    localStorage.setItem("userId", response.data.user.id);
    console.log(response.data.token)
    return response;
}

export async function register(name: string, email: string, password: string) {
    const response = await api.post("/api/create", {
        name,
        email,
        password,
    })
    return response;
}
