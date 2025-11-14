import { apiFetch } from "./client"

export interface LoginRequest {
    username: string;
    password: string;
}


export interface LoginResponse {
    message: string;
    data: {
        accessToken: string;
        refreshToken: string;
        user: {
            id: string;
            username: string;
            email: string;
        };
    }

}

export interface ForgotPasswordRequest {
    username: string,
    email: string,
    newPassword: string
}

export async function login(data: LoginRequest) {
    return apiFetch<LoginResponse>("auth/login", {
        method: "POST",
        body: JSON.stringify(data)
    })
}

export async function getProfile() {

    return apiFetch<{ id: string; role: string; }>("auth/profile", {
        method: "GET",
    })
}

export async function updatePassword(data: ForgotPasswordRequest) {

    return apiFetch<ForgotPasswordRequest>("auth/forgot-password", {
        method: "POST",
        body: JSON.stringify(data)
    })
}