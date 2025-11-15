export const API_URL = import.meta.env.MODE === "production" ? import.meta.env.VITE_API_URL : "http://localhost:3000/api";

console.log(API_URL)

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

  // se o token expirou ou foi invalidado (senha trocada)
  if (res.status === 401) {
    const logoutEvent = new CustomEvent("logout");
    window.dispatchEvent(logoutEvent);
    throw new Error("Sessão expirada. Faça login novamente.")
  }


  if (!res.ok) {
    const text = await res.text();

    let message = "Erro inesperado";

    try {
      const json = JSON.parse(text);
      message = json.message || message;
    } catch {
      message = text;
    }

    throw new Error(message);
  }

  return res.json() as Promise<T>;
}