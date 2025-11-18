import { storage } from "@/utils/storage";
import { refreshAccessToken } from "./refresh";

export const API_URL = import.meta.env.MODE === "production"
  ? import.meta.env.VITE_API_URL
  : "http://localhost:3000/api";

function getToken() {
  return storage.getToken();
}

export async function apiFetch<T>(
  endpoint: string,
  options: RequestInit = {}
): Promise<T> {

  const token = getToken();

  const doFetch = async (customToken?: string) => {
    return fetch(`${API_URL}/${endpoint}`, {
      headers: {
        "Content-Type": "application/json",
        ...(customToken ? { Authorization: `Bearer ${customToken}` } : {}),
        ...(options.headers || {}),
      },
      ...options,
    });
  };


  let res = await doFetch(token);


  if (res.status === 401) {
    const newAccessToken = await refreshAccessToken();

    if (!newAccessToken) {
      const logoutEvent = new CustomEvent("logout");
      window.dispatchEvent(logoutEvent);
      throw new Error("Sessão expirada. Faça login novamente.");
    }

    res = await doFetch(newAccessToken);
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
