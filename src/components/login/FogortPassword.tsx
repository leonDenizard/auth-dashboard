import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Lock, BadgeCheck, Mail, LockOpen, AlertCircle } from "lucide-react";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import { updatePassword } from "@/api/auth";

interface ForgotPasswordProps {
  onBack: () => void;
}

interface FormData {
  username: string;
  email: string;
  newPassword: string;
}

export default function ForgotPassword({ onBack }: ForgotPasswordProps) {
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    setError,
  } = useForm<FormData>();

  const onSubmit = async (data: FormData) => {
    try {
      await updatePassword(data);
      toast.success("Senha alterada com sucesso!");
      onBack();
    } catch (err: any) {
      // Erro da API vira erro "global"
      setError("root", { message: err.message });
    }
  };

  return (
    <div className="w-full max-w-md px-4 z-10">
      <div className="backdrop-blur-2xl bg-black/40 rounded p-8 shadow-xl">
        
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
          
          {/* Username */}
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
                placeholder="Digite seu username"
                className="pl-10 bg-zinc-950 border-zinc-800 text-white"
                autoComplete="off"
              />
            </div>

            {errors.username && (
              <p className="text-red-400 text-sm">{errors.username.message}</p>
            )}
          </div>

          {/* Email */}
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
                placeholder="email@exemplo.com"
                className="pl-10 bg-zinc-950 border-zinc-800 text-white"
                autoComplete="off"
              />
            </div>

            {errors.email && (
              <p className="text-red-400 text-sm">{errors.email.message}</p>
            )}
          </div>

          {/* Nova senha */}
          <div className="space-y-2">
            <Label htmlFor="newpassword" className="text-zinc-300">
              Nova senha
            </Label>
            <div className="relative">
              <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-white/70" />
              <Input
                id="newpassword"
                type="password"
                {...register("newPassword", {
                  required: "Digite a nova senha",
                  minLength: {
                    value: 4,
                    message: "A senha precisa ter pelo menos 4 caracteres",
                  },
                  maxLength: {
                    value: 12,
                    message: "A senha não pode ultrapassar 12 caracteres"
                  }
                })}
                autoComplete="off"
                placeholder="Digite sua nova senha"
                className="pl-10 bg-zinc-950 border-zinc-800 text-white"
              />
            </div>

            {errors.newPassword && (
              <p className="text-red-400 text-sm">{errors.newPassword.message}</p>
            )}
          </div>

          {/* Error global da API */}
          {errors.root?.message && (
            <div className="flex items-center gap-2 bg-red-950/50 border border-red-900 rounded-lg p-3">
              <AlertCircle className="w-5 h-5 text-red-500" />
              <p className="text-red-400 text-sm">{errors.root.message}</p>
            </div>
          )}

          {/* Botão */}
          <Button
            type="submit"
            className="w-full bg-white text-black hover:bg-zinc-200"
            disabled={isSubmitting}
          >
            {isSubmitting ? (
              <span className="flex items-center gap-2">
                <div className="w-4 h-4 border-2 border-black border-t-transparent rounded-full animate-spin"></div>
                Alterando senha...
              </span>
            ) : (
              <span className="flex items-center gap-2">
                <LockOpen className="w-4 h-4" />
                Alterar senha
              </span>
            )}
          </Button>
        </form>

        {/* Footer */}
        <div className="mt-6 pt-6 border-t-2 border-white/10">
          <div className="flex items-center justify-center text-sm gap-2">
            <a
              onClick={onBack}
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
