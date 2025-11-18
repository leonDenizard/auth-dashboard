import { createContext, useContext, useState, useEffect } from "react";
import { storage } from "@/utils/storage";
import { getProfile, type LoginResponse } from "@/api/auth";
import { useNavigate } from "react-router-dom";
import { refreshAccessToken } from "@/api/refresh";
import { jwtDecode } from "jwt-decode";

interface AuthContextType {
  user: { id: string; role: string } | null;
  token: string | null;
  login: (loginResponse: LoginResponse) => Promise<void>;
  logout: () => void;
}

const AuthContext = createContext<AuthContextType>({
  user: null,
  token: null,
  login: async () => {},
  logout: () => {},
});

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const [token, setToken] = useState<string | null>(storage.getToken());
  const [user, setUser] = useState<{ id: string; role: string } | null>(null);

  const navigate = useNavigate();

  useEffect(() => {
    async function tryRefresh() {
      const access = storage.getToken();
      const refresh = storage.getRefreshToken();

      if (!refresh) return;
      if (!access) return;

      try {
        const decoded = jwtDecode<{ exp: number }>(access);
        const now = Date.now() / 1000;

        if (decoded.exp < now) {
          const newToken = await refreshAccessToken();
          if (newToken) {
            setToken(newToken); // <-- ESSA LINHA É CRUCIAL
          } else {
            logout();
          }
        }
      } catch {
        logout();
      }
    }

    tryRefresh();
  }, []);

  useEffect(() => {
    const handleLogout = () => logout();
    window.addEventListener("logout", handleLogout);

    console.log("logou disparado");

    return () => window.removeEventListener("logout", handleLogout);
  }, []);

  async function login(loginResponse: LoginResponse) {
    const { accessToken, refreshToken } = loginResponse.data;

    storage.setToken(accessToken);
    storage.setRefreshToken(refreshToken);

    setToken(accessToken);
    const data = await getProfile();

    setUser(data);
  }

  function logout() {
    storage.clear();
    setToken(null);
    setUser(null);
    navigate("/");
  }

  return (
    <AuthContext.Provider value={{ user, token, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context)
    throw new Error("useAuth deve ser usado dentro do AuthProvider");
  return context;
};
