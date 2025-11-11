// components/login/Login.tsx
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useState } from "react";
import { login } from "@/api/auth";
import { useNavigate } from "react-router-dom";
import { LogIn, User, Lock, AlertCircle } from "lucide-react";
import { useAuth } from "@/context/AuthContext";

export default function LoginComponent({ onSwitch }) {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const { login: loginWithContext } = useAuth()

  const navigate = useNavigate();

  async function handleLogin(e: React.FormEvent) {
    e.preventDefault();
    setError("");
    setLoading(true);

    try {

      const response = await login({ username, password })

      if(response.data?.accessToken){
        await loginWithContext(response.data.accessToken)

        navigate("/dashboard")
      }

    } catch (error: any) {
      console.log("Erro ao logar", error.message);
      setError("Erro ao fazer login. Tente novamente.");
    } finally {
      setLoading(false);
      setPassword("");
    }
  }

  return (
    <div className="w-full max-w-md px-4">
      <div className="bg-zinc-900 rounded-lg p-8 shadow-xl">
        <form onSubmit={handleLogin} className="space-y-6">
          {/* Username Input */}
          <div className="space-y-2">
            <Label htmlFor="username" className="text-zinc-300">
              Usuário
            </Label>
            <div className="relative">
              <User className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-zinc-500" />
              <Input
                id="username"
                type="text"
                placeholder="Digite seu usuário"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                className="pl-10 bg-zinc-950 border-zinc-800 text-white placeholder:text-zinc-600 focus:border-zinc-700"
                required
              />
            </div>
          </div>

          {/* Password Input */}
          <div className="space-y-2">
            <Label htmlFor="password" className="text-zinc-300">
              Senha
            </Label>
            <div className="relative">
              <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-zinc-500" />
              <Input
                id="password"
                type="password"
                placeholder="Digite sua senha"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="pl-10 bg-zinc-950 border-zinc-800 text-white placeholder:text-zinc-600 focus:border-zinc-700"
                required
              />
            </div>
          </div>

          {/* Error Message */}
          {error && (
            <div className="flex items-center gap-2 bg-red-950/50 border border-red-900 rounded-lg p-3">
              <AlertCircle className="w-5 h-5 text-red-500 flex-shrink-0" />
              <p className="text-red-400 text-sm">{error}</p>
            </div>
          )}

          {/* Submit Button */}
          <Button
            type="submit"
            className="w-full bg-white text-black hover:bg-zinc-200 font-medium"
            disabled={loading}
          >
            {loading ? (
              <span className="flex items-center gap-2">
                <div className="w-4 h-4 border-2 border-black border-t-transparent rounded-full animate-spin"></div>
                Entrando...
              </span>
            ) : (
              <span className="flex items-center gap-2">
                <LogIn className="w-4 h-4" />
                Entrar
              </span>
            )}
          </Button>
        </form>

        {/* Footer Links */}
        <div className="mt-6 pt-6 border-t border-zinc-800">
          <div className="flex items-center justify-between text-sm">
            <a
              href="#"
              className="text-zinc-400 hover:text-white transition-colors py-2"
            >
              Esqueceu a senha?
            </a>
            <a
              onClick={onSwitch}
              href="#"
              className="text-zinc-400 hover:text-white transition-colors py-2"
            >
              Criar conta
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}
