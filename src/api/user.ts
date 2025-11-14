import { apiFetch } from "./client"

export interface UserRequest {

    username: string,
    name: string,
    email: string,
    password: string,
    // createdAt: Date,
    // updatedAt: Date
}

export interface UserResponse {
    username: string,
    name: string,
    email: string,
    message: string
}

export async function createUser(data:UserRequest){

    return apiFetch<UserResponse>("register", {
        method: "POST",
        body: JSON.stringify(data)
    })
}