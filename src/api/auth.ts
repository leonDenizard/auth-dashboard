import { apiFetch } from "./client"

export interface LoginRequest {
    username: string,
    password: string
}

export interface LoginResponse {
    token: string
    user:{
        id: string,
        role: string
    }
}

export async function login(data:LoginRequest) {
    return apiFetch<LoginResponse>("login", {
        method: "POST",
        body: JSON.stringify(data)
    })
}

export async function getProfile(token: string){

    return apiFetch<{id: string; role: string;}>("profile", {
        method: "GET",
        headers: {
            Authorization: `Bearer ${token}`
        }
    })
}