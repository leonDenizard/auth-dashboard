import { useAuth } from "@/context/AuthContext";
import { Navigate, Outlet } from "react-router-dom";
import { jwtDecode } from "jwt-decode";
import { refreshAccessToken } from "@/api/refresh";

export function ProtectedRoutes() {
  const { token } = useAuth();

  if (!token) return <Navigate to="/" replace />;

  try {
    const decoded = jwtDecode<{ exp: number }>(token);
    const now = Date.now() / 1000;

    // token expirado → só redireciona
    if (decoded.exp < now) {
     refreshAccessToken()
    }

    return <Outlet />;
  } catch (err) {
    return <Navigate to="/" replace />;
  }
}
