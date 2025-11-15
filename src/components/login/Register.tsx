// components/login/Login.tsx
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { User, Lock, BadgeCheck, Mail, UserCheck, AlertCircle } from "lucide-react";
import { createUser } from "@/api/user";
import { toast } from "sonner";
import { useForm } from "react-hook-form";

interface RegisterProp {
  onSwitch: () => void;
}

interface FormData{
  name: string, 
  username: string,
  email: string, 
  password: string
}
export default function Register({ onSwitch }: RegisterProp) {

  const {
    register,
    handleSubmit,
    formState: {errors, isSubmitting},
    setError
  } = useForm<FormData>()

  const onSubmit = async (data: FormData) => {
    try {
      
      await createUser(data);

      onSwitch();
      toast.success("Conta criada com sucesso!");
    } catch (err: any) {
      setError("root", {message: err.message})
    }
  }

  return (
    <div className="w-full max-w-md px-4 z-10">
      {/* Card de Login */}
      <div className="backdrop-blur-2xl bg-black/40 rounded p-8 shadow-xl">
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
          {/* Name Input */}
          <div className="space-y-2">
            <Label htmlFor="name" className="text-zinc-300">
              Nome
            </Label>
            <div className="relative">
              <User className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-white/70" />
              <Input
                id="name"
                {...register("name", {
                  required: "Informe seu nome",
                  minLength:{
                    value: 3,
                    message: "Mínimo de 3 caracteres"
                  }
                })}
                type="text"
                placeholder="Digite seu nome"
                className="pl-10 bg-zinc-950 border-zinc-800 text-white placeholder:text-zinc-600 focus:border-zinc-700"
              />
            </div>
            {errors.name && (
              <p className="text-red-400 text-sm">{errors.name.message}</p>
            )}
          </div>

          {/* Email Input */}
          <div className="space-y-2">
            <Label htmlFor="email" className="text-zinc-300">
              E-mail
            </Label>
            <div className="relative">
              <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-white/70" />
              <Input
                id="email"
                {...register("email", {
                  required: "Informe o e-mail",
                  pattern: {
                    value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
                    message: "Formato de e-mail inválido",
                  },
                })}
                type="text"
                placeholder="email@exemplo.com"
                className="pl-10 bg-zinc-950 border-zinc-800 text-white placeholder:text-zinc-600 focus:border-zinc-700"
                required
              />
            </div>
            {errors.email && (
              <p className="text-red-400 text-sm">{errors.email.message}</p>
            )}
          </div>

          {/* Username Input */}
          <div className="space-y-2">
            <Label htmlFor="username" className="text-zinc-300">
              Usuário
            </Label>
            <div className="relative">
              <BadgeCheck className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-white/70" />
              <Input
                id="name"
                 {...register("username", {
                  required: "Informe o usuário",
                  minLength: {
                    value: 3,
                    message: "Mínimo de 3 caracteres",
                  }
                })}
                type="text"
                placeholder="Crie um username"
                className="pl-10 bg-zinc-950 border-zinc-800 text-white placeholder:text-zinc-600 focus:border-zinc-700"
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
                  required: "Digite sua senha",
                  minLength: {
                    value: 4,
                    message: "A senha precisa ter pelo menos 4 caracteres",
                  },
                  maxLength: {
                    value: 12,
                    message: "A senha não pode ultrapassar 12 caracteres"
                  }
                })}
                type="password"
                placeholder="Digite sua senha"
                className="pl-10 bg-zinc-950 border-zinc-800 text-white placeholder:text-zinc-600 focus:border-zinc-700"
              />
            </div>
            {errors.password && (
              <p className="text-red-400 text-sm">{errors.password.message}</p>
            )}
          </div>

          {/* Error global da API */}
          {errors.root?.message && (
            <div className="flex items-center gap-2 bg-red-950/50 border border-red-900 rounded-lg p-3">
              <AlertCircle className="w-5 h-5 text-red-500" />
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
                Cadastrando usuário...
              </span>
            ) : (
              <span className="flex items-center gap-2">
                <UserCheck className="w-4 h-4" />
                Registrar conta
              </span>
            )}
          </Button>
        </form>

        {/* Footer Links */}
        <div className="mt-6 pt-6 border-t-2 border-white/10">
          <div className="flex items-center justify-center text-sm gap-2">
            <a
              onClick={onSwitch}
              href="#"
              className="text-zinc-400 hover:text-white transition-colors py-1 px-5"
            >
              ← Voltar para o login
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}
