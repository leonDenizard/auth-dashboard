import { createContext, useContext, useState, useEffect } from "react";
import { storage } from "@/utils/storage";
import { getProfile } from "@/api/auth";

interface AuthContextType {
  user: { id: string; role: string } | null;
  token: string | null;
  login: (token: string) => Promise<void>;
  logout: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const [token, setToken] = useState<string | null>(storage.getToken());
  const [user, setUser] = useState<{ id: string; role: string } | null>(null);

  useEffect(() => {
    // se já tem token salvo, tenta recuperar o perfil do usuário
    if (token) {
      getProfile()
        .then((data) => setUser(data))
        .catch(() => logout());
    }
  }, [token]);

  async function login(newToken: string) {
    storage.setToken(newToken);
    setToken(newToken);
    const data = await getProfile();
    setUser(data);
  }

  function logout() {
    storage.clear();
    setToken(null);
    setUser(null);
  }

  return (
    <AuthContext.Provider value={{ user, token, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) throw new Error("useAuth deve ser usado dentro do AuthProvider");
  return context;
};