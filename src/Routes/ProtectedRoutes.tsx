import { Navigate, Outlet } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import {jwtDecode} from "jwt-decode";

interface JwtPayload {
  exp: number; // tempo de expiração do token em segundos
}

export function ProtectedRoutes() {
  const { token, logout } = useAuth();

  if (!token) {
    return <Navigate to="/" replace />;
  }

  try {
    // decodifica o token para checar expiração
    const decoded = jwtDecode<JwtPayload>(token);
    const now = Date.now() / 1000; // em segundos

    // console.log("Token validade", decoded.exp)
    // console.log("hora agora", now)
    if (decoded.exp < now) {
      logout()
      return <Navigate to="/" replace />;
    }

    return <Outlet />;
  } catch (err) {
    // token inválido ou corrompido
    logout();
    return <Navigate to="/" replace />;
  }
}
