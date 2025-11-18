import { storage } from "@/utils/storage";
import { API_URL } from "./client";

export async function refreshAccessToken() {
  const refreshToken = storage.getRefreshToken();
  if (!refreshToken) return null;

  const res = await fetch(`${API_URL}/auth/refresh`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ refreshToken }),
  });

  if (!res.ok) return null;

  const data = await res.json();
  const newToken = data.data.accessToken;

  console.log("data da rota refresh", newToken)
  storage.setToken(newToken);
  return newToken;
}
