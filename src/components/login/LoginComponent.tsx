// components/login/Login.tsx
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { login } from "@/api/auth";
import { useNavigate } from "react-router-dom";
import { LogIn, Lock, AlertCircle, BadgeCheck } from "lucide-react";
import { useAuth } from "@/context/AuthContext";
import { useForm } from "react-hook-form";

interface LoginComponentProps {
  onSwitch: () => void;
  onForgot: () => void;
}

interface FormData{
  username: string,
  password: string
}
export default function LoginComponent({ onSwitch, onForgot }: LoginComponentProps) {
  // const [username, setUsername] = useState("");
  // const [password, setPassword] = useState("");
  // const [error, setError] = useState("");
  // const [loading, setLoading] = useState(false);
  
  const {
      register,
      handleSubmit,
      formState: { errors, isSubmitting },
      setError,
    } = useForm<FormData>();

  const { login: loginWithContext } = useAuth()

  const navigate = useNavigate();

  const onSubmit = async(data: FormData) => {
    try {

      const response = await login(data)

      console.log(response)
      console.log(response.data.accessToken)
      if(response.data.accessToken){
        await loginWithContext(response.data.accessToken)

        navigate("/dashboard")
      }
    } catch (err: any) {
      setError("root", { message: err.message });
    }
  }

  // async function handleLogin(e: React.FormEvent) {
  //   e.preventDefault();
  //   setError("");
  //   setLoading(true);

  //   try {

  //     const response = await login({ username, password })

  //     console.log(response)
  //     console.log(response.data.accessToken)
  //     if(response.data.accessToken){
  //       await loginWithContext(response.data.accessToken)

  //       navigate("/dashboard")
  //     }

  //   } catch (error: any) {
  //     console.log("Erro ao logar", error.message);
  //     setError("Erro ao fazer login. Tente novamente.");
  //   } finally {
  //     setLoading(false);
  //     setPassword("");
  //   }
  // }

  return (
    <div className="w-full max-w-md px-4">
      <div className="backdrop-blur-2xl bg-black/40 rounded p-8 shadow-xl">
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
          {/* Username Input */}
          <div className="space-y-2">
            <Label htmlFor="username" className="text-zinc-300">
              Usuário
            </Label>
            <div className="relative">
              <BadgeCheck className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-white/70" />
              <Input
                id="username"
                {...register("username", {
                  required: "Informe o usuário",
                  minLength: {
                    value: 3,
                    message: "Mínimo de 3 caracteres",
                  }
                })}
                type="text"
                placeholder="Digite seu usuário"
                // value={username}
                // onChange={(e) => setUsername(e.target.value)}
                className="pl-10 bg-zinc-950 border-zinc-800 text-white placeholder:text-zinc-600 focus:border-zinc-700"
                //required
              />
            </div>
            {errors.username && (
              <p className="text-red-400 text-sm">{errors.username.message}</p>
            )}
          </div>

          {/* Password Input */}
          <div className="space-y-2">
            <Label htmlFor="password" className="text-zinc-300">
              Senha
            </Label>
            <div className="relative">
              <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-white/70" />
              <Input
                id="password"
                {...register("password", {
                  required: "Digite sua senha para continuar",
                  minLength:{ 
                    value: 4,
                    message: "A senha precisa ter pelo menos 4 caracteres"
                  }
                })}
                type="password"
                placeholder="Digite sua senha"
                // value={password}
                // onChange={(e) => setPassword(e.target.value)}
                className="pl-10 bg-zinc-950 border-zinc-800 text-white placeholder:text-zinc-600 focus:border-zinc-700"
                //required
              />
            </div>
            {errors.password && (
              <p className="text-red-400 text-sm">{errors.password.message}</p>
            )}
          </div>

          {/* Error Message */}
          {errors.root?.message && (
            <div className="flex items-center gap-2 bg-red-950/50 border border-red-900 rounded-lg p-3">
              <AlertCircle className="w-5 h-5 text-red-500 flex-shrink-0" />
              <p className="text-red-400 text-sm">{errors.root.message}</p>
            </div>
          )}

          {/* Submit Button */}
          <Button
            type="submit"
            className="w-full bg-white text-black hover:bg-zinc-200 font-medium"
            disabled={isSubmitting}
          >
            {isSubmitting ? (
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
        <div className="mt-6 pt-6 border-t-2 border-white/10">
          <div className="flex items-center justify-between text-sm">
            <a
              onClick={onForgot}
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
