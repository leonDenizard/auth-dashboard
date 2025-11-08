export const API_URL = import.meta.env.VITE_API_URL || "http://localhost:300/api"

export async function apiFetch<T>(
    endpoint: string,
    options: RequestInit = {}
): Promise<T>{
    const res = await fetch(`${API_URL}/${endpoint}`, {
        headers: {
            "Content-type" : "application/json",
            ...(options.headers || {})
        },
        ...options,
    })

    if(!res.ok){
        const errorText = await res.text()
        throw new Error(`Erro ${res.text}: ${errorText}`)
    }

    return res.json() as Promise<T>
}