// components/login/Login.tsx
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useEffect, useState } from "react";
import { LogIn, User, Lock, BadgeCheck, Mail } from "lucide-react";
import { toast } from "sonner";
import { updatePassword } from "@/api/auth";

interface RegisterProp {
  onSwitch: () => void;
}

export default function FogortPassword({ onBack }) {
  const [username, setUsername] = useState();
  const [email, setEmail] = useState();
  const [newPassword, setNewPassword] = useState();
  const [loading, setLoading] = useState(false);

  const handleUpdatePassword = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      const response = await updatePassword({username, email, newPassword});

      console.log(username, email, newPassword );

      onBack();
      toast.success("Senha alterada com sucesso!");
    } catch (error: any) {
      console.log("Erro ao criar usuário", error.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    console.log(username, email, newPassword)
  }, [username, email, newPassword])
  

  return (
    <div className="w-full max-w-md px-4">
      {/* Card de Login */}
      <div className="bg-zinc-900  rounded-lg p-8 shadow-xl">
        <form onSubmit={handleUpdatePassword} className="space-y-6">
          
          {/* Username Input */}
          <div className="space-y-2">
            <Label htmlFor="username" className="text-zinc-300">
              Usuário
            </Label>
            <div className="relative">
              <BadgeCheck className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-zinc-500" />
              <Input
                id="username"
                type="text"
                placeholder="Crie um username"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                className="pl-10 bg-zinc-950 border-zinc-800 text-white placeholder:text-zinc-600 focus:border-zinc-700"
                required
              />
            </div>
          </div>
          
          {/* Email Input */}
          <div className="space-y-2">
            <Label htmlFor="email" className="text-zinc-300">
              E-mail
            </Label>
            <div className="relative">
              <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-zinc-500" />
              <Input
                id="email"
                type="text"
                placeholder="email@exemplo.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="pl-10 bg-zinc-950 border-zinc-800 text-white placeholder:text-zinc-600 focus:border-zinc-700"
                required
              />
            </div>
          </div>

          {/* NEWPassword Input */}
          <div className="space-y-2">
            <Label htmlFor="newpassword" className="text-zinc-300">
              Senha
            </Label>
            <div className="relative">
              <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-zinc-500" />
              <Input
                id="newpassword"
                type="password"
                placeholder="Digite sua senha"
                value={newPassword}
                onChange={(e) => setNewPassword(e.target.value)}
                className="pl-10 bg-zinc-950 border-zinc-800 text-white placeholder:text-zinc-600 focus:border-zinc-700"
                required
              />
            </div>
          </div>

          {/* Submit Button */}
          <Button
            type="submit"
            className="w-full bg-white text-black hover:bg-zinc-200 font-medium"
            disabled={loading}
          >
              <span className="flex items-center gap-2">
                <LogIn className="w-4 h-4" />
                Alterar senha
              </span>
          </Button>
        </form>

        {/* Footer Links */}
        <div className="mt-6 pt-6 border-t border-zinc-800">
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
