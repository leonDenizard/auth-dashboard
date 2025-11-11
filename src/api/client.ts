export const API_URL = import.meta.env.VITE_API_URL || "http://localhost:3000/api";

// Função para obter o token do localStorage
function getToken() {
  return localStorage.getItem("token");
}

export async function apiFetch<T>(
  endpoint: string,
  options: RequestInit = {}
): Promise<T> {
  const token = getToken();

  const res = await fetch(`${API_URL}/${endpoint}`, {
    headers: {
      "Content-Type": "application/json",
      ...(token ? { Authorization: `Bearer ${token}` } : {}),
      ...(options.headers || {}),
    },
    ...options,
  });

  if (!res.ok) {
    const errorText = await res.text();
    throw new Error(`Erro ${res.status}: ${errorText}`);
  }

  return res.json() as Promise<T>;
}